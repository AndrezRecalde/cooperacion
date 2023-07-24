<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    <!-- <link rel="stylesheet" type="text/css" href="{{ public_path('/public/css/bootstrap3/bootstrap.min.css') }}"> -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            min-height: 100vh;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cards {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            margin: 20px 0;
        }

        .card {
            position: relative;
            padding: 15;
            border-radius: 3px;
            background: #fff;
        }

        .card .card_title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
            margin-top: 10px;
        }

        .card .card_title span {
            border-radius: 3px;
            font-size: 16px;
            padding: 5px 10px;
            color: #000000;

        }

        .card .card_content {
            color: gray;
            margin-bottom: 2px;
        }

        .card .card_action {
            display: flex;
            flex-direction: column;
        }

        .card .card_action .tags {
            display: flex;
            gap: 6px;
            margin-top: 10px;
            flex-wrap: wrap;
        }


        .divider {
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            margin-bottom: 12px;
        }


        table {
            margin-top: 10px;
            font-size: 18px;
            border-collapse: collapse;
            box-shadow: 0 0 0 1px black;
            /* overflow: hidden;
            border-style: hidden; */
            table-layout: fixed;
        }

        td,
        th {
            border: 1px solid black;
            padding: 12px 22px;
            text-align: center;
            line-height: 20px;
        }

        td {
            font-size: 12px;
            word-wrap: break-word;
            padding: 5px 10px;

        }

        th {
            font-size: 16px;
        }

        thead tr {
            background-color: #babebb;
            color: #fafafa;
        }

        thead th {
            width: 25%;
        }

        tbody tr:nth-child(odd) {
            background-color: #f8f9fa;
        }

        tbody tr:nth-child(even) {
            background-color: #e9ecef;
        }

        .img {
            width: 260px;
            height: 80px;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>


    <div class="container">
        <div class="card">
            <center>
                <img src="{{ public_path('/images/LogoGadpe.png') }}" alt="Logo" class="img">
            </center>
            <center>
                <strong
                    style="font-size: 20px;">{{ Str::upper('Información General del Perfil del Proyecto') }}</strong>
            </center>
            <div class="card_title">
                <span>{{ Str::upper('Información General') }}</span>
            </div>
            <div class="divider"></div>
            <div class="card_content">
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>
                            <th>{{ Str::upper('Periodo') }}</th>
                            <th>{{ Str::upper('Organización') }}</th>
                            <th>{{ Str::upper('Proyecto') }}</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            @empty($proyecto->periodo)
                                <td>Periodo no registrado</td>
                            @else
                                <td>{{ $proyecto->periodo }}</td>
                            @endempty
                            <td>{{ Str::upper($proyecto->nombre_organizacion) }}</td>
                            <td>{{ Str::upper($proyecto->nombre_proyecto) }}</td>

                        </tr>
                    </tbody>
                </table>
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>

                            <th>{{ Str::upper('Tipo Cooperación') }}</th>
                            <th>{{ Str::upper('Modalidad') }}</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ Str::upper($proyecto->tipo_cooperacion) }}</td>
                            <td>{{ Str::upper($proyecto->modalidad) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div class="card_title">
                <span>{{ Str::upper('Sintesis') }}</span>
            </div>
            <div class="divider"></div>
            <div class="card_content">
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>
                            <th>{{ Str::upper('Objetivo General') }}</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $proyecto->objetivo_general }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div class="card_title">
                <span>{{ Str::upper('Ubicación del proyecto') }}</span>
            </div>
            <div class="divider"></div>
            <div class="card_content">
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>
                            <th>{{ Str::upper('Cantón') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>
                                @foreach ($proyecto->cantones as $canton)
                                    <ul>
                                        <li>{{ $canton->nombre_canton }}</li>
                                    </ul>
                                @endforeach
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="card_title">
                <span>{{ Str::upper('Plan Nacional de Desarrollo') }}</span>
            </div>
            <div class="divider"></div>
            <div class="card_content">
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>
                            <th>{{ Str::upper('Objetivos Desarrollo Sostenible') }}</th>
                            <th>{{ Str::upper('Grupos de Atención Prioritaria') }}</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                @foreach ($proyecto->odsostenibles as $ods)
                                    <ul>
                                        <li>{{ $ods->objetivo_ods }}</li>
                                    </ul>
                                @endforeach
                            </td>
                            <td>
                                @foreach ($proyecto->grupos as $grupo)
                                    <ul>
                                        <li>{{ $grupo->grupo }}</li>
                                    </ul>
                                @endforeach
                            </td>

                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="card_title">
                <span>{{ Str::upper('Beneficiados') }}</span>
            </div>
            <div class="divider"></div>
            <div class="card_content">
                <table border="1" width="100" style="width:100%;">
                    <thead>
                        <tr>
                            <th>{{ Str::upper('Beneficiados Directos') }}</th>
                            <th>{{ Str::upper('Beneficiados Inirectos') }}</th>
                            <th>{{ Str::upper('Monto del Proyecto') }}</th>



                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $proyecto->beneficiados_directos }}</td>
                            <td>{{ $proyecto->beneficiados_indirectos }}</td>
                            <td>{{ $proyecto->monto }} USD</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</body>

</html>
