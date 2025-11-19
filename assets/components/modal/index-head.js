jQuery( document ).ready(function() {

    if (! window.j77electionModal) {
        window.j77electionModal = new AbstractElectionModal();
        window.j77electionModal.init();
    }
});