<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->unsignedBigInteger('category_id')->nullable(false);
            $table->text('description')->nullable(false);
            $table->integer('quantity')->nullable(false);
            $table->integer('price')->nullable(false);
            $table->integer('saleoff')->nullable();
            $table->string('status')->nullable(false)->default("Đang bán");
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
