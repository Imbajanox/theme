/*
    global jQuery
*/

jQuery(function () {

    var globalSearch = jQuery(".global-search").first();

    if (globalSearch.length == 0) {
        return;
    }

    var searchResults = globalSearch.find(".search-results");
    var searchForm = globalSearch.find("form").first();
    var searchInput = searchForm.find("input[type=text]").first();
    var clearbutton = searchForm.find("button[data-button=clear]").first();
    var searchOptions = window.WirklichDigital.searchOptions;
    var searchUrl = searchForm.attr('action');
    var spinner = searchForm.find(".spinner");

    jQuery(document).on('keyup',function(e){
        if(e.altKey && e.key == 'z') {
            jQuery('header .options .search > button').trigger('click');
            searchInput.focus();
            clearSearch();
        }
    });

    var lastrequest = null;

    clearbutton.on('click tap', function() {
        clearSearch();
    });

    var clearSearch = function(){
        searchInput.val("");
        clearSearchResult();
        clearbutton.hide();
    }

    var hideSearchResult = function () {
        searchInput.removeClass('results-visible');
        searchResults.removeClass('visible');
    };

    var setLoading = function() {
        clearbutton.hide();
        spinner.show();
    }

    var setNotLoading = function() {
        spinner.hide();
        if(searchInput.val()) {
            clearbutton.show();
        }
    }

    var clearSearchResult = function () {
        hideSearchResult();
        searchResults.empty();
    };

    var buildSearchResult = function (html) {

        html = String(html || "").trim();

        if (html == "") {
            clearSearchResult();
            return;
        }

        searchResults.html(html);
        searchResults.addClass('visible');
        searchInput.addClass('results-visible');
        var searchResultsUl = jQuery(searchResults.find('[data-result-group]')[0]);
        var searchResultsLi = searchResultsUl.find('li').first();
        searchResultsLi.addClass("search-result-active");

        if(searchResultsLi.find('span').hasClass('result-empty-title'))
            searchResultsUl.addClass('empty-result');
    };


    var loadSearchResult = function (search) {
        setLoading();

        if (lastrequest) {
            lastrequest.abort();
            lastrequest = null;
        }

        clearSearchResult();

        var request = jQuery.ajax({
            url: searchUrl,
            type: "GET",
            cache: false,
            async: true,
            data: {
                search : search,
            },
            dataType: "html",
        });

        lastrequest = request;

        request.done(function (html) {
            setNotLoading();
            buildSearchResult(html);
        });

        request.fail(function (jqXHR, textStatus) {
            setNotLoading();
            var html = String(jqXHR.statusText || textStatus);
            html = '<div class="results-error">' + html + '</div>';

            buildSearchResult(html);        
        });

        return request;
    };

    var update = function () {

        var value = searchInput.val();
        value = value.trim();

        if (value.length < searchOptions.minStringLength) {
            hideSearchResult();
            return;
        }

        loadSearchResult(value);
    };

    searchInput.on('keyup', function () {

        if(searchInput.val() != "") {
            clearbutton.show();
        } else {
            clearbutton.hide();
        }

        window.clearTimeout(window.globalSearchTimeout);
        window.globalSearchTimeout = window.setTimeout(function(){
            update();
        }, 350);
    });

    globalSearch.on('submit', function (e) {
        window.clearTimeout(window.globalSearchTimeout);
        update();

        e.preventDefault();
    });

});
