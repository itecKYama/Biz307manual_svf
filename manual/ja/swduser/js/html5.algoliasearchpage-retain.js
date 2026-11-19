if (! Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function (obj) {
            var newArr = this.filter(function (el) {
                return el == obj;
            });
            return newArr.length > 0;
        }
    });
}

var searchpagetitle = {
    'en': "Search", 'ja': "絞り込み検索"
};
var filterstitle = {
    'en': "Filters", 'ja': "フィルター"
};
var searchresultstitle = {
    'en': "Search results", 'ja': "検索結果"
};

search.addWidget(
instantsearch.widgets.refinementList({
    container: '#product-refinement',
    attribute: 'product_info.product',
    sortBy:[ 'count:desc', 'name:asc'],
    limit: 100,
    operator: 'or',
    templates: {
        header: product[portalLanguage],
        item: '<label class="{{cssClasses.label}}"><input type="checkbox" onclick="checkRefBox(this)" class="{{cssClasses.checkbox}}" value="{{value}}" {{#isRefined}}checked{{/isRefined}}/> <span class="{{cssClasses.labelText}}">{{{highlighted}}} </span><span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></label>',
    }
}));

$(document).on('click', '.ais-SearchBox-submit', function (event) {
    localStorage.setItem('searchquery', document.querySelector("#searchbox > div > form > input").value);
});
$(document).on('keyup', '.ais-SearchBox-input', function (event) {
    localStorage.setItem('searchquery', document.querySelector("#searchbox > div > form > input").value);
});
$(document).on('click', '.ais-ClearRefinements-button', function (event) {
    localStorage.setItem('refinements', JSON.stringify([]));
});
function checkRefBox(checkbox) {
    var refinements =[];
    if (localStorage[ 'refinements']) {
        refinements = JSON.parse(localStorage.getItem('refinements'));
    } else {
        refinements =[];
    };
    if (checkbox.checked && (! refinements.includes(checkbox.value))) {
        refinements.push(checkbox.value);
    } else {
        index = refinements.indexOf(checkbox.value);
        refinements.splice(index, 1);
    };
    localStorage.setItem('refinements', JSON.stringify(refinements));
}
var searchquery = '';
var content_type = {
    'en': 'Content type', 'ja': "マニュアル"
};
var searchname = {
    'en': 'Search', 'ja': "検索"
};
var clearrefinements = {
    'en': "Clear filters", 'ja': "フィルターの解除"
};

var noresults = {
    'en': 'We did not find any results for the search <em>\"{{query}}\"</em>', 'ja': "「{{query}}」は見つかりませんでした。"
};
var tenhits = {
    'en': '10', 'ja': '10件'
};
var fiftyhits = {
    'en': '50', 'ja': '50件'
};


search.addWidget(
instantsearch.widgets.searchBox({
    container: '#searchbox',
    cssClasses: {
        input: 'form-control search-field',
        submit: 'btn'
    },
    showReset: false,
    autofocus: true,
    placeholder: searchname[portalLanguage],
}));

search.addWidget(
instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    templates: {
        resetLabel: clearrefinements[portalLanguage],
    },
    cssClasses: {
        button: 'btn btn-default',
    },
}));

search.addWidget(
instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
        item: '<div class="hit">' +
        '<div class="hit-content">' +
        '<a href="' + portalLanguage + '/' + '{{ url_fragment }}">' +
        '<h3 class="hit-title">{{ title }}</h3>' +
        '<p class="hit-body">{{{_highlightResult.body.value}}}</p>' +
        '</a>' +
        '<p class="hit-breadcrumbs">{{ breadcrumbs }}</p>' +
        '</div>',
        empty: noresults[portalLanguage]
    }
}));

search.addWidget(
instantsearch.widgets.hitsPerPage({
    container: '#hits-per-page',
    items:[ {
        label: tenhits[portalLanguage], value: 10, default: true
    }, {
        label: fiftyhits[portalLanguage], value: 50
    },],
}));
search.addWidget(
instantsearch.widgets.pagination({
    container: '#pagination'
}));

search.addWidget(
instantsearch.widgets.hierarchicalMenu({
    container: '#content-refinement',
    attributes:[ 'content_type.level0_category', 'content_type.level1_category'],
    templates: {
        header: 'Hierarchical categories'
    }
}));

if (localStorage[ 'searchquery']) {
    searchquery = localStorage.getItem('searchquery');
}

if (localStorage[ 'refinements']) {
    refinements = localStorage.getItem('refinements');
} else {
    refinements = "[]";
}
search.addWidget(
instantsearch.widgets.configure({
    query: searchquery,
    disjunctiveFacetsRefinements: {
        'product_info.product': JSON.parse(refinements),
    },
    hierarchicalFacetsRefinements: {
        'content_type.level0_category':[content_type[portalLanguage]],
    },
}));

$('.logo-link').attr("href", "./index.html");

