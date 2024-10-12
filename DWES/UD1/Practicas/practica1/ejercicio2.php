<?php

$total = 0;

for($i=1; $i<=2; $i++){
    echo 'Insert number ' . $i . ': ';
    $number = trim(fgets(STDIN));
    $total = $total + (int)$number;
}

echo 'total = ' . $total;

?>