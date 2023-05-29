<x-mail::message>
## Nueva Solicitud
### Sistema de Red de Afiliación para Cooperantes

Buen día.

Se notifica que existe una nueva petición de afiliación en el sistema.

La solicitud la realiza el Sr/a {{ $afiliacion->nombres }},
representante de la entidad {{  $afiliacion->entidad }}
el cual desea un pronto contacto a tráves de sus canales de comunicación:<br>


__Télefono Contacto:__ ___{{ $afiliacion->telefono }}___<br>
__Email Contacto:__ ___{{  $afiliacion->email }}___<br>
__Télefono Entidad:__ ___{{ $afiliacion->telefono_org }}___<br>


***Para mayor información revise el sistema en la pestaña de Afiliaciones***

### Por favor no responder a este mensaje de correo.


Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
