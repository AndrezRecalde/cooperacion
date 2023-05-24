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
        Schema::create('dir_prefecturas', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('provincia_id');
            $table->string('direccion');
            $table->string('prefecto');
            $table->string('viceprefecto');
            $table->string('gobernador');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dir_prefecturas');
    }
};
