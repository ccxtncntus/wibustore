<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>orders</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <div class="col-md-6">
            <div>
                <h3 style="margin-bottom:4px">Cảm ơn bạn đã mua hàng bên shop Wibustore</h3>
                <p style="margin-bottom:4px">Đơn hàng của bạn đã được xác nhận.</p>
                <p style="margin-bottom:4px">Tên khách hàng : {{ $dataOrders['orders']['name'] }}</p>
                <p style="margin-bottom:4px">Địa chỉ : {{ $dataOrders['orders']['address'] }}</p>
                <p style="margin-bottom:4px">Số điện thoại : {{ $dataOrders['orders']['phoneNumbers'] }}</p>
            </div>
            <div>Chi tiết: </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($dataOrders['orderDetail'] as $orderDetail)
                        <th scope="row">{{ $loop->iteration }}</th>
                        <td>{{ $orderDetail['name'] }}</td>
                        <td>{{ $orderDetail['quantitybuy'] }}</td>
                        <td>{{ $orderDetail['price'] }}</td>
                        <td>{{ $orderDetail['totail'] }}</td>
                    @endforeach
                    <tr>

                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th scope="row">Tổng cộng:</th>
                        <td> {{ $dataOrders['orders']['totail'] }} <span style="font-size: .8rem">(Đã bao gồm
                                ship)</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
