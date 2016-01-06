<?php

# random numbers
$rand = rand(1, 100);
echo "your new random value is $rand\n";


# arrays and loops
date_default_timezone_set('America/Los_Angeles');
$months = [];
for ($m = 1; $m <= 12; $m++) {
    $months[$m - 1] = date('F', mktime(0, 0, 0, $m, 1, date('Y')));
    echo $months[$m - 1] . "\n";
}

?>