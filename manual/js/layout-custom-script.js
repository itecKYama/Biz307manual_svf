(function () {

  $(function(){
    $("div.example-contents:has(pre.programlisting:only-child)").addClass("exprog");
    $("div.informalexample:has(pre.programlisting:only-child)").addClass("exprog");
    
    if($(".algolia-autocomplete").length){
      $("form.portal-search").addClass("algoliasearch");  
    } 
    
    // toc search
    $.get('../search.html')
      .done(function(){
        $('[lang="ja"] .site-sidebar-search').after('<div class="toc-search"><a href="../search.html" target="_blank">絞り込み検索</a></div>');
      });
    
    // portal search
    $('.search-page-link a').attr('target', '_blank')
    $('[data-portal-language="ja"] .search-page-link a').text('絞り込み検索');
    
  });
})(jQuery);

$(document).ready(function () {
  
  // search icon
  $('.site-sidebar input').attr("placeholder", "\uf002");
  $('.algoliasearch input').attr("placeholder", "\uf002");
  
  // algolia search box tooltip
  var aa_tooltip = '完全一致検索のキーワードや半角-（ハイフン）で始まるキーワードは、""で囲みます。'
  $('#aa-search-input').attr("title", aa_tooltip);
  $('.ais-SearchBox-input').attr("title", aa_tooltip);
  $("input").tooltip();
  
});

// algolia for IE
var polyfillScript = document.createElement("script");
polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries';
document.head.appendChild(polyfillScript);
