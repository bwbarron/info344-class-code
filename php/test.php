<?php

$name = "Brandon";
$fullName = $name . " Barron";

class Person {
    protected $name;

    public function __construct($n) {
        $this->name = $n;
    }

    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function";
}

echo "Hello {$name}s\n";
foo(null);

?>