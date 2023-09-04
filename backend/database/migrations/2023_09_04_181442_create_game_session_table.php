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
        Schema::create('game_session', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('memo_id');
            $table->integer('retries');
            $table->integer('number_of_pairs');
            $table->enum('state', ['Started', 'Completed']);

            $table->foreign('memo_id')->references('id')->on('memo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('game_session', function (Blueprint $table) {
            //
        });
    }
};
