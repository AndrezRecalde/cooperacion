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
        Schema::create('afiliaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombres');
            $table->string('entidad');
            $table->string('cargo');
            $table->string('telefono');
            $table->string('email');
            $table->string('razon_social');
            $table->string('sitio_web');
            $table->string('telefono_org');
            $table->string('direccion_org');
            $table->string('descripcion_org');
            $table->boolean('contactado')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('afiliaciones');
    }
};
