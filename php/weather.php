<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather</title>
</head>
<body>
    <?php
    $usrLocData = json_decode(file_get_contents('http://ip-api.com/json'));
    # get user location data and use in query
    $data = json_decode(file_get_contents('http://api.openweathermap.org/data/2.5/weather?q=Seattle,us&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0'));
    ?>

    <h1>Weather Info</h1>

    <p>Location: <?= $data->name ?></p>
    <p>Current temperature: <?= $data->main->temp ?></p>
    <p>Weather description: <?= $data->weather[0]->description ?></p>
</body>
</html>