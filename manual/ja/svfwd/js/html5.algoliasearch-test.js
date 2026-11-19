$(document).ready(function () {
    addSearch();
});

function addSearch() {
//     if (hasScript()) {
//         // [JIRA:DOCG-580] If autocomplete.jquery-wingarc.js is already loaded, add an instance for search
//         addSearchImpl();
//     } else {
//         // [JIRA:DOCG-580] If autocomplete.jquery-wingarc.js is not already loaded, load autocomplete.jquery-wingarc.js,  and add an instance for search
//         $.get(getOwnURLPath() + 'autocomplete.jquery-wingarc.js').done(function(data) {
//             var script = document.createElement("script");
//             script.text = data;
//             script.setAttribute("id", "autocomplete.jquery-wingarc.js");
//             document.head.appendChild(script);
//             addSearchImpl();
//         });
//     }
// }

// function addSearchImpl() {
    // [JIRA:DOCG-580] If an element for autocomplete has already been created, only re-search based on prior input
    if ($(".algolia-autocomplete").size()) {
        var typeahead = aaTypeaheads[0];
        if (typeahead) {
            var aaWACurrentInputFromSS = sessionStorage.getItem("aaWACurrentInput") || "";
            if (aaWACurrentInputFromSS != "") {
                $("#aa-search-input").val(aaWACurrentInputFromSS);
                typeahead.dropdown.update("");
                typeahead.dropdown.update(aaWACurrentInputFromSS);
                typeahead.dropdown.open();
            }
        }
        return
    }

    $("#aa-search-input").keyup(function () {
        var input = $(this);
        
        if (input.val() == "") {
            $('.overlay').hide();
        }
    });
    
    //For permalinks: data-topic-level will only be set if produce.permalink = 1 in XSLT
    var topiclevel = $('section[data-topic-level]').first().attr('data-topic-level');
    var up = '';
    
    if (topiclevel != '') {
        for (i = 1; i < parseInt(topiclevel);
        i++) {
            up += '../';
        }
    }
    
    //If this is the portal/index page:
    if ($('.portal-search-result').length) {
        up = portalLanguage + '/';

        //If the customer has specified a custom index there will be no language mappings. If so use the existing publication_id.
        publication_id = publication_langs_id[portalLanguage] ? publication_langs_id[portalLanguage] : publication_id;
    }
    
    var client = algoliasearch(algolia_application_id, algolia_search_only_api_key);
    var index = client.initIndex(publication_id);
    //initialize autocomplete on search input (ID selector must match)
    var where = currentHtmlPage(document.URL);
    if (where.index) {
        $("[data-portal-language='" + portalLanguage + "'] #aa-search-input, .site-body #aa-search-input, .site-header #aa-search-input").autocomplete({
            hint: false,
            autoselect: true,
        },[ {
            source: $.fn.autocomplete.sources.hits(index, {
                /*The users can set this in the Algolia dashboard instead.*/
                /*hitsPerPage: 5*/
            }),
            //value to be displayed in input control after user's suggestion selection
            displayKey: 'title',
            //hash of templates used when rendering dataset
            templates: {
                //'suggestion' templating function used to render a single suggestion
                suggestion: function (suggestion) {
                    var body = suggestion._highlightResult.body.value;
    
                    // Escape tags
                    body = body.replace(/\<em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-1]');
                    body = body.replace(/\<\/em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-2]');
                    body = body.replace(/\</g, '&lt;');
                    body = body.replace(/\>/g, '&gt;');
                    body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-1\]/g, '<em>');
                    body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-2\]/g, '</em>');
    
                    var html = '<a href="' + up + suggestion.url_fragment +
                    '"><div class="aa-search-title" data-toggle="tooltip" title="' + suggestion.breadcrumbs + '">' +
                    suggestion._highlightResult.title.value +
                    '</div><div class="aa-search-body">' +
                    body + '</div></a>';
    
                    return html;
                }
            }
        }]).on('autocomplete:shown', function (event, suggestion, dataset) {
            $('.overlay').show();
            // [JIRA:DOCG-580] Process of setting the tooltip is performed only once at the end of loading.
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip();
            }, 500);
        }).on('autocomplete:closed', function (event, suggestion, dataset) {
            $('.overlay').hide();
        }).on('autocomplete:selected', function (dataset, suggestion) {
            location.href = up + suggestion.url_fragment;
            //Note: Important to prepend the up path.
        });
        // [JIRA:DOCG-580] Set focus input.
        $("#aa-search-input").focus();
    }
    // [JIRA:DOCG-580] Pass the prior input content and display the search results in UUID-*.html.
    else if (where.uuid) {
        var aaWACurrentInputFromSS = sessionStorage.getItem("aaWACurrentInput") || "";
        aaTypeaheads = aaTypeaheads.splice(0);
        $("[data-portal-language='" + portalLanguage + "'] #aa-search-input, .site-body #aa-search-input, .site-header #aa-search-input").autocompleteEx({    // [JIRA:DOCG-580] Change from autocomplete to autocompleteEx.
            hint: false,
            autoselect: true,
            priorInput: aaWACurrentInputFromSS,    // [JIRA:DOCG-580] prior input content.
            typeaheads: aaTypeaheads    // [JIRA:DOCG-580] List of creating Typehead instance.
        },[ {
            source: $.fn.autocompleteEx.sources.hits(index, {    // [JIRA:DOCG-580] Change from autocomplete to autocompleteEx.
                /*The users can set this in the Algolia dashboard instead.*/
                /*hitsPerPage: 5*/
            }),
            //value to be displayed in input control after user's suggestion selection
            displayKey: 'title',
            //hash of templates used when rendering dataset
            templates: {
                //'suggestion' templating function used to render a single suggestion
                suggestion: function (suggestion) {
                    var body = suggestion._highlightResult.body.value;
    
                    // Escape tags
                    body = body.replace(/\<em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-1]');
                    body = body.replace(/\<\/em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-2]');
                    body = body.replace(/\</g, '&lt;');
                    body = body.replace(/\>/g, '&gt;');
                    body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-1\]/g, '<em>');
                    body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-2\]/g, '</em>');
    
                    var html = '<a href="' + up + suggestion.url_fragment +
                    '"><div class="aa-search-title" data-toggle="tooltip" title="' + suggestion.breadcrumbs + '">' +
                    suggestion._highlightResult.title.value +
                    '</div><div class="aa-search-body">' +
                    body + '</div></a>';
                    
    
                    return html;
                }
            }
        }]).on('autocomplete:shown', function (event, suggestion, dataset) {
            $('.overlay').show();
            // [JIRA:DOCG-580] Set the display position of the search results to the position before the transition.
            $('aside.site-sidebar').scrollTop(sessionStorage.getItem("aaWACurrentScrollTop"));
            // [JIRA:DOCG-580] Process of setting the tooltip is performed only once at the end of loading.
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip();
            }, 500);
        }).on('autocomplete:closed', function (event, suggestion, dataset) {
            $('.overlay').hide();
        }).on('autocomplete:selected', function (dataset, suggestion) {
            location.href = up + suggestion.url_fragment;
            //Note: Important to prepend the up path.
        });
    }
}

// [JIRA:DOCG-580] Whether or not there is a script tag with an id of autocomplete.jquery-wingarc.js.
// function hasScript() {
//     return document.getElementById("autocomplete.jquery-wingarc.js");
// }

// // [JIRA:DOCG-580] Get your own URL path from script element.
// function getOwnURLPath() {
//     var path = "";
//     var scripts = document.getElementsByTagName("script");
//     var i = scripts.length;
//     while (i--) {
//         var match = scripts[i].src.match(/(.*\/)html5\.algoliasearch\.js/);
//         if (match) {
//             path = match[1];
//             break;
//         }
//     }
//     return path;
// }
