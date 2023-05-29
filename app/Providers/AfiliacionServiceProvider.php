<?php

namespace App\Providers;

use App\Interfaces\AfiliacionInterface;
use App\Repositories\AfiliacionRepository;
use Illuminate\Support\ServiceProvider;

class AfiliacionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AfiliacionInterface::class, AfiliacionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
