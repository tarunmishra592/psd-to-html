
var urlOption = '';
method_options(urlOption);

function selectChange(){
	var optionSelected = $("#sortBy").val();
	if (optionSelected == 'none') {
		var urlOption = '';
		method_options(urlOption);
		return false;
	}
	method_options(optionSelected);
	return false;
}

function method_options(selectedVal){
  	$.ajax({
		url: "products.json",
		dataType: "json"
	}).success(function(productData){
		var htmlText = '';
		if(selectedVal == ''){
			for (var i = 0; i < productData.length; i++){
				htmlText += '<section class="product-box">';
				htmlText += '<div class="product-image"><img src="'+productData[i].productImage+'" alt="'+productData[i].productName+'"></div>';
				htmlText += '<div class="product-details">';
				htmlText += '<div class="sale-exclusive">';
				if(productData[i].isSale == true){htmlText +='<div class="product-sale">Sale</div>'};
				if(productData[i].isExclusive == true){htmlText +='<div class="product-exclusive">Exclusive</div>'};
				htmlText += '</div>';
				htmlText += '<div class="product-name-price clearfix">';
				htmlText +=	'<h3>'+productData[i].productName+'</h3>';
				htmlText +=	'<h4>'+productData[i].price+'</h4>';
				htmlText +=	'</div>';
				htmlText +=	'</div>';
				htmlText +=	'</section>';
			}
		}else{
			$.each(productData, function( index, items ) {
				var Size = searchSize(selectedVal, items.size);
				if(Size == true){
					htmlText += '<section class="product-box">';
					htmlText += '<div class="product-image"><img src="'+items.productImage+'" alt=""></div>';
					htmlText += '<div class="product-details">';
					htmlText += '<div class="sale-exclusive">';
					if( items.isSale == true ){htmlText +='<div class="product-sale">Sale</div>'};
					if( items.isExclusive == true ){htmlText +='<div class="product-exclusive">Exclusive</div>'};
					htmlText += '</div>';
					htmlText += '<div class="product-name-price clearfix">';
					htmlText +=	'<h3>'+items.productName+'</h3>';
					htmlText +=	'<h4>'+items.price+'</h4>';
					htmlText +=	'</div>';
					htmlText +=	'</div>';
					htmlText +=	'</section>';
				}
			});
		}
		$('#productsList').html(htmlText);
	});
}

function searchSize(selectedSize, allItems){
	for (var j=0; j<allItems.length; j++) {
        if (allItems[j].match(selectedSize)) {
			return true;
		}
    }
	return false;
}

