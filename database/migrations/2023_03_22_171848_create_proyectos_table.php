<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('organizacion_id');
            $table->string('nombre_proyecto');
            $table->text('objetivo_general');
            $table->unsignedInteger('canton_id');
            $table->unsignedInteger('parroquia_id');
            $table->unsignedInteger('recinto_id');
            //$table->unsignedInteger('grupo_atencion_id');
            $table->string('grupo_beneficiado');
            $table->unsignedInteger('total_beneficiados');
            //$table->unsignedInteger('odsostenible_id');
            $table->unsignedInteger('cooperacion_id');
            $table->unsignedInteger('modalidad_id');
            $table->decimal('monto', 15, 2);
            $table->unsignedInteger('periodo_id')->nullable();
            $table->unsignedInteger('estado_id');
            $table->boolean('activo')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
