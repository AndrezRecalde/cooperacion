<?php

namespace App\Enums;


enum MsgStatusEnum:string {
    case Creacion = 'Creado con éxito';
    case Actualizado = 'Actualizado con éxito';
    case Eliminado = 'Eliminado con éxito';
    case Success = 'success';
    case Error = 'error';
    case NotFound = 'No Encontrado';
    case SolicitudSuccess = 'Solicitud enviada con éxito';
    case ErrorImagen = 'Hubo un error al subir el archivo';
    case CreacionAfiliacion = 'Su solicitud fue enviada con éxito';
    case CreacionProyecto = '¡El proyecto se ha creado y será revisado lo más pronto posible!';
}
