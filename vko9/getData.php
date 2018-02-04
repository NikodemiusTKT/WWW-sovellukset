<?php
if (isset($_POST['url'])) {
    $mem  = new Memcached();
    $mem->addServer('127.0.0.1',11211);

    $result = $mem->get($_POST['name']);

if ($result) {
    $result['source'] = "MemCached";
    echo json_encode($result);
} else {
    /* echo "No matching key found.  I'll add that now!"; */
    $json_url = $_POST['url'];
    $data = file_get_contents($json_url);
    $weather_data = json_decode($data);
    $weather = $weather_data->list[0]->weather[0]->description;
    $icon = $weather_data->list[0]->weather[0]->icon;
    $temp = $weather_data->list[0]->main->temp;
    $pressure = $weather_data->list[0]->main->pressure;
    $humidity = $weather_data->list[0]->main->humidity;
    $city = $weather_data->list[0]->name;
    $wind = $weather_data->list[0]->wind->speed;
    $time = $weather_data->list[0]->dt;
    $new_data = array(
        "city" => $city,
        "weather" => $weather, 
        "icon" => $icon,
        "temp" => $temp, 
        "pressure" => $pressure,
        "humidity" => $humidity, 
        "wind" => $wind, 
        "time" => $time); 
    $mem->set($_POST['name'],$new_data,3600) or die("Couldn't save anything to memcached...");
    $new_data['source'] ="OpenWeather.org";
    echo json_encode($new_data);
}
}

?>
