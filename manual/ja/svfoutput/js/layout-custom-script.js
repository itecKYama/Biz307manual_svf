// Algolia 検索用の tooltip 定義
// キー: 言語コード、値: 言語コードに応じたメッセージ
var tooltipsForAlgolia = {
  "ja": '完全一致検索のキーワードや半角-（ハイフン）で始まるキーワードは、""で囲みます。',
  "en": 'When performing an exact match search or entering a keyword beginning with - (hyphen), enclose keywords in "" (double quotes).',
  "zh": '请使用 "" 将完全匹配查找的关键字和以半角 -(连字符)开头的关键字括起。',
};

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
    // ・言語ごとに Algolia 検索用 input 要素に tooltip を設定
    // ・言語を切り替えた際、切り替え後の言語用メッセージが特定の input 要素に設定されるよう、セレクタに言語や属性を詳細に設定
    for (var lang in tooltipsForAlgolia) {
      // for index.html
      $('header[data-portal-language=' + lang + '] input[id=aa-search-input]').attr('title', tooltipsForAlgolia[lang]);
      // for 個別ページ
      $('html[lang=' + lang + '] input[id=aa-search-input]').attr('title', tooltipsForAlgolia[lang]);
      // for search.html
      $('header[data-portal-language=' + lang + '] input[class="ais-SearchBox-input form-control search-field"]').attr("title", tooltipsForAlgolia[lang]);
    }
  $("input").tooltip();
  
});

// algolia for IE
var polyfillScript = document.createElement("script");
polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries';
document.head.appendChild(polyfillScript);
