<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Todo list</title>
        <style>
            body{
                background: #F0EFE9;
            }
            a { cursor: pointer; }
        .pagination {
           justify-content: center;
           flex-wrap: wrap;
        }
        </style>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
    </body>
    <script src="{{ mix('js/app.js') }}"></script>
</html>
