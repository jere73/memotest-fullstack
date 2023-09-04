<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Image;
use App\Models\Memo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        try {

            DB::beginTransaction();

            Image::factory()->count(8)->create();

            DB::table('memo')->insert([[
                'name' => 'First Memo Example',
            ], [
                'name' => 'Second Memo Example',
            ]]);

            $firstMemo = Memo::first();
            $secondMemo = Memo::skip(1)->first();

            $images = Image::all();

            $alternateMemo = true;

            foreach ($images as $image) {

                $currentMemo = $alternateMemo ? $firstMemo : $secondMemo;

                $image->memos()->attach($currentMemo->id);

                $alternateMemo = !$alternateMemo;
            }

            DB::commit();

        } catch(\Exception $exception) {
            DB::rollBack();
        }

    }
}
