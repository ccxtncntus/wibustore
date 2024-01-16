<?php

namespace App\Http\Controllers;

use App\Models\Images;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\UpdateImg;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $pageNumber = $request->pageNumber;
        $products = Products::paginate(10, ['*'], 'page', $pageNumber);
        if ($products->count() === 0) {
            $upData = [
                "status" => 400,
                "message" => "There aren't any products",
            ];
            return response()->json($upData, 400);
        } else {
            $data = [
                "status" => 200,
                "data" => $products,
            ];
            return response()->json($data, 200);
        }
    }

    public function onceProduct($value)
    {
        $products = Products::select(
            'products.id',
            'products.name',
            'products.status',
            'products.description',
            'products.quantity',
            'products.price',
            'products.saleoff',
            DB::raw('GROUP_CONCAT(images.url) AS all_images')
        )
            ->join('images', 'images.product_id', '=', 'products.id')
            ->where('name', 'like', '%' . $value . '%')
            ->groupBy(
                'products.id',
                'products.status',
                'products.saleoff',
                'products.price',
                'products.quantity',
                'products.description',
                'products.name',
            )
            ->get();
        $data = [
            "status" => 200,
            "data" => $products,
        ];
        return response()->json($products, 200);
    }

    public function listProductOfCategory(Request $request, $id)
    {
        $pageNumber = $request->pageNumber;
        $products = Products::where('category_id', $id)->paginate(10, ['*'], 'page', $pageNumber);
        $data = [
            "status" => 200,
            "data" => $products,
        ];
        return response()->json($data, 200);
    }

    public function upload(Request $request)
    {
        $price = $request->price;
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:products', 'max:255'],
            "category_id" => ['required'],
            "description" =>  ['required'],
            "quantity" => ['numeric', 'min:1'],
            "price" =>  ['numeric', 'min:1'],
            "saleoff" => ['nullable', 'numeric', 'min:0', function ($attribute, $value, $fail) use ($price) {
                if (!empty($value) && $value >= $price) {
                    $fail('The saleoff must be less than the price.');
                }
            },],
            "status" => ['required', 'max:100'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $products = new Products;
            $products->name = $request->name;
            $products->category_id = $request->category_id;
            $products->description = $request->description;
            $products->quantity = $request->quantity;
            $products->price = $request->price;
            $products->saleoff = $request->saleoff;
            $products->status = $request->status;
            $products->save();
            $lastInsertId = $products->id;

            // test tải img lên server
            $upImgInserve = new UpdateImg();
            $uploadSuccess = $upImgInserve->upload($request);
            // tải img
            $imagesController = new ImagesController();
            $uploadResult = $imagesController->upload($uploadSuccess, $lastInsertId);

            $data = [
                "status" => 200,
                "lastID" => $lastInsertId,
                "dataImg" => $uploadResult->original,
                "message" => "update thành công",
            ];
            return response()->json($data, 200);
        }
    }
    public function show(string $id)
    {
        $products = Products::select(
            'products.id',
            'products.name',
            'products.status',
            'products.description',
            'products.quantity',
            'products.price',
            'products.saleoff',
            DB::raw('GROUP_CONCAT(images.url) AS all_images')
        )
            ->join('images', 'images.product_id', '=', 'products.id')
            ->where('products.id', '=', $id)
            ->groupBy(
                'products.id',
                'products.status',
                'products.saleoff',
                'products.price',
                'products.quantity',
                'products.description',
                'products.name',
            )
            ->get();
        if ($products->count() === 0) {
            $upData = [
                "status" => 400,
                "message" => "Không tồn tại",
            ];
            return response()->json($upData, 400);
        } else {
            $data = [
                "status" => 200,
                "data" => $products,
            ];
            return response()->json($data, 200);
        }
    }

    public function edit(Request $request, $id)
    {

        $price = $request->price;
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('products')->ignore($id), 'max:255'
            ],
            "description" =>  ['required'],
            "quantity" => ['numeric', 'min:1'],
            "price" =>  ['numeric', 'min:1'],
            "saleoff" => ['nullable', 'numeric', 'min:0', function ($attribute, $value, $fail) use ($price) {
                if (!empty($value) && $value >= $price) {
                    $fail('The saleoff must be less than the price.');
                }
            },],
            "status" => ['required', 'max:100'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $input = $request->except('category_id', 'images');
            $products = Products::find($id)->update($input);

            $upImgInserve = new UpdateImg();
            $uploadSuccess = $upImgInserve->upload($request);
            if ($uploadSuccess === 400) {
                $uploadResult = 'Không có img';
            } else {
                $imagesController = new ImagesController();
                $uploadResult = $imagesController->upload($uploadSuccess, $id);
            }
            $data = [
                "status" => 200,
                "dataImg" => $uploadResult,
                "message" => $products,
            ];
            return response()->json($data, 200);
        }
    }

    public function delete($id)
    {
        if (Products::where('id', $id)->exists()) {
            $image = Images::select('url')->where('product_id', $id)->get();
            if (count($image) > 0) {
                foreach ($image as $i) {
                    $imagePath = public_path('uploads') . '/' . $i->url;
                    if (File::exists($imagePath)) {
                        File::delete($imagePath);
                    }
                }
            }
            $products = Products::find($id);
            $products->delete();
            $data = [
                "status" => 200,
                "message" => "Del Success",
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 200,
                "message" => "there are not product",
            ];
            return response()->json($data, 200);
        }
    }

    public function crawl($p)
    {
        // use GuzzleHttp\Client;
        // use Symfony\Component\DomCrawler\Crawler;
        $client = new Client();
        $response = $client->request('GET', "https://toyz.vn/categories/one-piece?&page=$p");
        $html = $response->getBody()->getContents();

        $crawler = new Crawler($html);
        $data = $crawler->filter('.product_grid_item');
        // $result = $data->count(); 

        $result = [];
        $data->each(function (Crawler $node) use (&$result) {
            $img = $node->filter('img')->attr('src');
            $name = $node->filter('h3')->html();
            // $count = $node->filter('.product-sale-price')->text();
            $link = $node->filter('a')->attr('href');
            $result[] = ['img' => $img, 'name' => $name, "link" => $link];
        });
        return $result;
    }


    public function crawlDetail($path)
    {
        $client = new Client();
        $response = $client->request('GET', "https://toyz.vn/products/$path");
        $html = $response->getBody()->getContents();

        $crawler = new Crawler($html);
        $data = $crawler->filter('.psnip-slider-item');
        // $result = $data->count();
        $content = $crawler->filter('.product-thumbnail');
        $name = $content->filter('a')->html();
        $price = $content->filter('.price_span_child')->html();
        $information = $content->filter('.text_exposed_show')->html();

        $result = [];
        $data->each(function (Crawler $node) use (&$result) {
            $count = $node->filter('img')->attr('src');
            $result[] = ['img' => $count];
        });
        $dataResult = [
            'img' => $result, 'price' => $price, 'name' => $name, 'information' => $information
        ];
        return $dataResult;
    }
}
