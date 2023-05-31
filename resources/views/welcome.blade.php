<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2019/09/cropped-IconoLogoGadpe2019-32x32.png" sizes="32x32">
        @viteReactRefresh
        @vite('resources/js/app.js')
    </head>
    <body class="antialiased">
        <div id="root"></div>
    </body>
</html>
