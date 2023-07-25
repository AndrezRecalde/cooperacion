<?php

use App\Http\Controllers\Admin\AfiliacionController;
use App\Http\Controllers\Admin\ConvenioController;
use App\Http\Controllers\Admin\CooperacionController;
use App\Http\Controllers\Admin\DirPrefecturaController;
use App\Http\Controllers\Admin\EstadoController;
use App\Http\Controllers\Admin\GrupoAtencionController;
use App\Http\Controllers\Admin\InstitucionController;
use App\Http\Controllers\Admin\ModalidadController;
use App\Http\Controllers\Admin\OdsostenibleController;
use App\Http\Controllers\Admin\OrganizacionController;
use App\Http\Controllers\Admin\PDFController;
use App\Http\Controllers\Admin\PeriodoController;
use App\Http\Controllers\Admin\ReferenciaInternacionalController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\StatesController;
use App\Http\Controllers\Admin\TiposController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Mapa\PointController;
use App\Http\Controllers\Mapa\ProyectoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(
    ['middleware' => ['auth:sanctum']],
    function () {
        Route::get('/refresh', [AuthController::class, 'refresh']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        /* Cooperaciones */
        Route::get('/admin/cooperaciones', [CooperacionController::class, 'getCooperacionesAll']);
        Route::post('/admin/cooperaciones/search', [CooperacionController::class, 'getCooperacionesSearch']);
        Route::post('/admin/create/cooperacion', [CooperacionController::class, 'store']);
        Route::put('/admin/update/cooperacion/{id}', [CooperacionController::class, 'update']);
        Route::delete('/admin/delete/cooperacion/{id}', [CooperacionController::class, 'destroy']);

        /* Estados */
        Route::get('/admin/estados', [EstadoController::class, 'getEstadosAll']);

        /* Modalidades */
        Route::get('/admin/modalidades', [ModalidadController::class, 'getModalidadesAll']);
        Route::post('/admin/create/modalidad', [ModalidadController::class, 'store']);
        Route::put('/admin/update/modalidad/{id}', [ModalidadController::class, 'update']);
        Route::delete('/admin/delete/modalidad/{id}', [ModalidadController::class, 'destroy']);

        /* Objetivos ODS */
        Route::put('/admin/update/odsostenible/{id}', [OdsostenibleController::class, 'update']);

        /* Organizaciones */
        Route::get('/admin/show/edit/organizacion/{id}', [OrganizacionController::class, 'showForEdit']);
        Route::post('/admin/create/organizacion', [OrganizacionController::class, 'store']);
        Route::post('/admin/update/organizacion', [OrganizacionController::class, 'update']);
        Route::put('/admin/update/organizacion/convenio/{id}', [OrganizacionController::class, 'updateConvenio']);
        Route::delete('/admin/delete/organizacion/{id}', [OrganizacionController::class, 'destroy']);

        /* Proyectos */
        Route::get('/admin/proyectos', [ProyectoController::class, 'getProyectosAdmin']);
        Route::get('/admin/show/edit/proyecto/{id}', [ProyectoController::class, 'showForEdit']);
        Route::put('/admin/update/proyecto/{id}', [ProyectoController::class, 'update']);
        Route::put('/admin/update/proyecto/activo/{id}', [ProyectoController::class, 'updateActivo']);
        Route::delete('/admin/delete/proyecto/{id}', [ProyectoController::class, 'destroy']);

        /* Tipos de Organizacion */
        Route::post('/admin/create/tipo', [TiposController::class, 'store']);
        Route::put('/admin/update/tipo/{id}', [TiposController::class, 'update']);
        Route::delete('/admin/delete/tipo/{id}', [TiposController::class, 'destroy']);


        /* Usuarios */
        Route::post('/admin/create/usuario', [UserController::class, 'store']);
        Route::put('/admin/update/usuario/{id}', [UserController::class, 'update']);
        Route::get('/admin/show/edit/usuario/{id}', [UserController::class, 'showForEdit']);
        Route::delete('/admin/delete/usuario/{id}', [UserController::class, 'destroy']);
        Route::put('/admin/update/usuario/password/{id}', [UserController::class, 'updatePassword']);
        Route::put('/admin/update/usuario/activo/{id}', [UserController::class, 'updateActivo']);

        /* afiliaciones */
        Route::get('afiliaciones', [AfiliacionController::class, 'getAfiliacionesAdmin']);
        Route::put('/update/contactado/afiliacion/{id}', [AfiliacionController::class, 'updateContactado']);
        Route::delete('/delete/afiliacion/{id}', [AfiliacionController::class, 'destroy']);

        /* Exportacion PDF Proyectos */
        Route::post('/admin/pdf/proyecto', [PDFController::class, 'getFichaProyectoPDF']);

        /* Exportacion PDF Archivos de Afiliaciones */
        Route::post('/admin/archivos/afiliaciones', [PDFController::class, 'getArchivosAfiliaciones']);

        /* Exportacion Excel */
        Route::get('/admin/export/excel/organizaciones', [OrganizacionController::class, 'exportOrganizaciones']);


        /* Referencias Internacionales */
        Route::get('/admin/referencias/internacionales', [ReferenciaInternacionalController::class, 'getRefInternacionales']);
        Route::post('/admin/create/referencia/internacional', [ReferenciaInternacionalController::class, 'store']);
        Route::put('/admin/update/referencia/internacional/{id}', [ReferenciaInternacionalController::class, 'update']);


        /* Directorio de Prefecturas */
        Route::get('/admin/prefecturas', [DirPrefecturaController::class, 'getPrefecturas']);
        Route::post('/admin/create/prefectura', [DirPrefecturaController::class, 'store']);
        Route::put('/admin/update/prefectura/{id}', [DirPrefecturaController::class, 'update']);

        /* Periodos */
        Route::get('/admin/periodos', [PeriodoController::class, 'getPeriodosAdmin']);
        Route::post('/admin/create/periodo', [PeriodoController::class, 'store']);
        Route::put('/admin/update/periodo/{id}', [PeriodoController::class, 'update']);
        Route::delete('/admin/delete/periodo', [PeriodoController::class, 'destroy']);
    }

);



Route::group(
    [],
    function () {
        /* Cooperaciones */
        Route::get('/cooperaciones/activas', [CooperacionController::class, 'getCooperacionesActivas']);

        /* Estados */
        Route::get('/estados/activos', [EstadoController::class, 'getEstadosActivos']);

        /* Modalidades */
        Route::get('/modalidades/activas', [ModalidadController::class, 'getModalidadesActivas']);

        /* Objetivos ODS */
        Route::get('odsostenibles', [OdsostenibleController::class, 'getOdsostenibles']);


        /* Organizaciones */
        Route::get('organizaciones', [OrganizacionController::class, 'getOrganizaciones']);
        Route::get('/organizaciones/activas', [OrganizacionController::class, 'getOrganizacionesActivas']);
        Route::get('/show/organizacion/{id}', [OrganizacionController::class, 'show']);
        Route::get('/total/organizaciones', [OrganizacionController::class, 'totalOrganizaciones']);

        /* Proyectos */
        Route::get('/proyectos/activos', [ProyectoController::class, 'getProyectosActivos']);
        Route::post('/create/proyecto', [ProyectoController::class, 'store']);
        Route::get('/total/proyectos', [ProyectoController::class, 'totalProyectos']);
        Route::get('/proyectos/monto', [ProyectoController::class, 'montoEjecutado']);
        Route::post('/proyecto/search', [ProyectoController::class, 'searchProyecto']);
        Route::get('/grafico/proyectos/ods', [ProyectoController::class, 'graficoProyectosOds']);
        Route::get('/grafico/proyectos/tipos', [ProyectoController::class, 'graficoProyectosTipos']);

        /* Estados: Pais, Estado, Ciudad */
        Route::get('paises', [StatesController::class, 'getPaises']);
        Route::post('estados', [StatesController::class, 'getEstados']);
        Route::post('ciudades', [StatesController::class, 'getCiudades']);
        Route::get('provincias', [StatesController::class, 'getProvincias']);
        Route::get('cantones', [StatesController::class, 'getCantones']);
        Route::post('parroquias', [StatesController::class, 'getParroquias']);
        Route::post('recintos', [StatesController::class, 'getRecintos']);


        /* Tipos de Organizacion */
        Route::get('tipos/organizacion', [TiposController::class, 'getTipos']);

        /* Puntos del Mapa */
        Route::post('points', [PointController::class, 'getPoints']);

        /* Convenios */
        Route::get('convenios', [ConvenioController::class, 'getConvenios']);

        /* Usuarios */
        Route::get('usuarios', [UserController::class, 'getUsuarios']);

        /* Roles */
        Route::get('roles', [RoleController::class, 'getRoles']);

        /* Instituciones */
        Route::get("/instituciones", [InstitucionController::class, 'getInstituciones']);

        /* Grupos de atencion */
        Route::get('/grupos/atencion', [GrupoAtencionController::class, 'getGrupoAtencion']);


        /* Afiliaciones */
        Route::post('/create/afiliacion', [AfiliacionController::class, 'store']);

        /* Periodos */
        Route::get('periodos', [PeriodoController::class, 'getPeriodos']);
    }
);
