function convertToVietnamese(str) {
  let newString;
  switch (str) {
    case "Den": {
      newString = "Đen";
      break;
    }
    case "Xam": {
      newString = "Xám";
      break;
    }
    case "Do": {
      newString = "Đỏ";
      break;
    }
    case "Vang": {
      newString = "Vàng";

      break;
    }
    case "Hong": {
      newString = "Hồng";

      break;
    }
    case "Trang": {
      newString = "Trắng";

      break;
    }
    case "Nau": {
      newString = "Nâu";
      break;
    }
    case 'mens-clothing':{
      newString='Quần áo nam'
      break
    }
    case 'womens-clothing':{
      newString='Quần áo nữ'
      break
    }
    case 'brand':{
      newString='Thương hiệu'
      break
    }
    case 'size':{
      newString='Kích thước'
      break
    }
    case 'color':{
      newString='Màu sắc'
      break
    }
    case 'pricess':{
      newString='Giá '
      break
    }
    
    default:
    newString=str
  }
  return newString
}

export default convertToVietnamese
