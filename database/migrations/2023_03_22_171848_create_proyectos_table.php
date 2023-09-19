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
            $table->string('beneficiados_directos');
            $table->string('beneficiados_indirectos')->nullable();
            $table->unsignedInteger('cooperacion_id');
            $table->unsignedInteger('modalidad_id');
            $table->decimal('monto', 15, 2)->default(0);
            $table->decimal('contrapartida', 15, 2)->default(0);
            $table->unsignedInteger('periodo_id');
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
