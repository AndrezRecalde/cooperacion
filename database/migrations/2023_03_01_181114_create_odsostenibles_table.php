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
        Schema::create('odsostenibles', function (Blueprint $table) {
            $table->id();
            $table->string('objetivo_ods');
            $table->text('descripcion');
            $table->string('color');
            $table->string('logo_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('odsostenibles');
    }
};
