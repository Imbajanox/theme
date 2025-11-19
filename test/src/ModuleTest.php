<?php
namespace WirklichDigital\ElectionThemeTest;

use PHPUnit\Framework\TestCase;
use WirklichDigital\ElectionTheme\Module;

class ModuleTest extends TestCase
{

    public function setUp()
    {
    }

    public function tearDown()
    {
    }

    public function testModule()
    {
        $this->assertTrue(class_exists(Module::class));
    }
}
