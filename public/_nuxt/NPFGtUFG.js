import{I as s,g as $,J as i,K as I,x as h,p as f,L as c}from"./CZTMkqHr.js";import{l as x,b as _}from"./BT1gpDxZ.js";import{p as d,i as y}from"./CVVGevBh.js";import{p as b,w as C,m}from"./im70S_LC.js";function g(k){return k&&k.length>0?k:void 0}const a=$`
  title,
  "slug": slug.current
`;function l(k){if(s(k,["title","slug"]))return k}const A=$`
slices[!defined(disabled) || !disabled] {
  ...,

  _type == "titleSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title[] { ${C} }
  },

  _type == "centeredContentWithBackgroundSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title,
    text,
    buttons[] { ${c} },
    media { ${m} },
  },

  _type == "pathCardsSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title,
    sections[] {
      title,
      icon { ${y} },
      cards[] {
        title,
        text
      }
    }
  },

  _type == "textRevealSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title,
    sections[] {
      title,
      features[] {
        media { ${m} },
        text,
        button { ${c} }
      }
    }
  },

  _type == "donutChartSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    chart[] {
      ...,
      "color": coalesce(color.hex, '#000000'),
    }
  },

  _type == "valueSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    items[] {
      ...,
      media { ${m} },
      button { ${c} }
    }
  },

  _type == "centeredContentSlice" => {
    ...,
    title,
    text,
    secondText,
    youtubeUrls,
    buttons[] { ${c} },
    media { ${m} },
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
  },

  _type == "textAndImageSlice" => {
    _type,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title[] { ${C} },
    text[] { ${C} },
    "button": button { ${c} },
    media { ${m} }
  },

  _type == "cardsSlice" => {
    sliceId { ${a} },
    "backgroundColor": backgroundColor.hex,
    title,
    subtitle,
    text,
    button { ${c} },
    items[] {
      title,
      lastItem,
      maxItemsPerLine,
      desktopLayout,
      mobileLayout,
      cards[] {
        _type,
        ...,
        cardColors {
          "title": title.hex,
          "text": text.hex,
          "background": background.hex,
        },
        buttons[] { ${c} },
        button { ${c} },
        link { ${c} },
        media { ${m} },
        "text": coalesce(text[] { ${C} }, text),
      }
    }
  },

  _type == "liveAssetsStatsSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    currencies[] {
      ...,
      icon { ${y} }
    }
  },

  _type == "metricsSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
  },

  _type == "faqSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    button { ${c} },
    items[] {
      question,
      answer[] { ${C} }
    }
  },

  _type == "heroSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    media { ${m} },
    buttons[] { ${c} },
    linkCards[] {
      ...,
      icon {${y}},
      button {${c}}
    }
  },

  _type == "servicesSliderSlice" => {
    sliceId { ${a} },
    "backgroundColor": backgroundColor.hex,
    button { ${c} },
    items[]->{ ${x} }
  },

  _type == "brandAssetsSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    items[] {
      ...,
      buttons[] { ${c} },
      media { ${m} }
    }
  },

  _type == "servicesSearchSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    "items": select(
      count(items) > 0 => items[]->{ ${x} },
      *[_type == 'service'] | order(lower(name) asc) { ${x} }
    )
  },

  _type == "articlesListSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    featuredArticles[]->{
      ${_}
    },
    "items": *[_type == 'article'] | order(date desc) {
      ${_}
    }
  },

  _type == "wysiwygSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    text[]{ ${C} }
  },

  _type == "tableSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    lines[] {
      ...,
      icon { ${y} }
    },
    columns[] {
      ...,
      icon { ${y} },
      button { ${c} }
    }
  },

  _type == "homeHeroSlice" => {
    _type,
    ...,
    "backgroundColor": backgroundColor.hex,
    title[] { ${C} },
    subtitle[] { ${C} },
    buttons[] { ${c} },
    sliceId { ${a} },
    media { ${m} }
  },

  _type == "centeredCardsSlice" => {
    _type,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    title,
    button { ${c} },
    cards[] {
      title,
      text,
      media { ${m} }
    }
  },

  _type == "swapSlice" => {
    _type,
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    swapLink { ${c} },
  },

  _type == "featuresSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
  },

  _type == "freedomSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    button { ${c} },
    cards[] {
      ...,
      text[] { ${C} },
      media { ${m} }
    }
  },

  _type == "ecosystemSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    button { ${c} },
    items[]-> { ${x} }
  },

  _type == "techSlice" => {
    _type,
    title,
    text,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    button { ${c} },
    items[] {
      _key,
      name,
      "icon": select(
        iconKey in [
          "tech/avalanche",
          "tech/bitcoin",
          "tech/bitcoin-cash",
          "tech/bittensor",
          "tech/bnb-smart-chain",
          "tech/circle-usdc",
          "tech/cosmos",
          "tech/dogecoin",
          "tech/ethereum",
          "tech/litecoin",
          "tech/monero",
          "tech/solana",
          "tech/tether-usdt",
          "tech/tron",
          "tech/xrp-ledger",
          "tech/zcash"
        ] => { "isCustom": false, "icon": iconKey },
        name == "Avalanche" => { "isCustom": false, "icon": "tech/avalanche" },
        name == "Bitcoin" => { "isCustom": false, "icon": "tech/bitcoin" },
        name == "Bitcoin Cash" => { "isCustom": false, "icon": "tech/bitcoin-cash" },
        name == "Bittensor" => { "isCustom": false, "icon": "tech/bittensor" },
        name == "BNB Smart Chain" => { "isCustom": false, "icon": "tech/bnb-smart-chain" },
        name == "Circle USDC" => { "isCustom": false, "icon": "tech/circle-usdc" },
        name == "Cosmos" => { "isCustom": false, "icon": "tech/cosmos" },
        name == "Dogecoin" => { "isCustom": false, "icon": "tech/dogecoin" },
        name == "Ethereum" => { "isCustom": false, "icon": "tech/ethereum" },
        name == "Litecoin" => { "isCustom": false, "icon": "tech/litecoin" },
        name == "Monero" => { "isCustom": false, "icon": "tech/monero" },
        name == "Solana" => { "isCustom": false, "icon": "tech/solana" },
        name == "Tether USDT" => { "isCustom": false, "icon": "tech/tether-usdt" },
        name == "TRON" => { "isCustom": false, "icon": "tech/tron" },
        name == "XRP Ledger" => { "isCustom": false, "icon": "tech/xrp-ledger" },
        name == "Zcash" => { "isCustom": false, "icon": "tech/zcash" },
        icon { ${y} }
      )
    }
  },

  _type == "lastArticlesSlice" => {
    ...,
    "backgroundColor": backgroundColor.hex,
    sliceId { ${a} },
    button { ${c} },
    "items": select(
      showLastArticles == true => *[_type == "article" && defined(slug.current)] | order(date desc)[0...3] {
        ${_}
      },
      items[]->{
        ${_}
      }
    )
  },
}
`;function M(k){return k?.map(t=>{if("_type"in t){if(t._type==="servicesSliderSlice")return t.items?{...t,sliceId:l(t.sliceId),button:i(t.button),items:t.items.map(e=>({...e,link:i(e.link,{asLink:!0}),icon:d(e.icon),colorIcon:d(e.colorIcon)}))}:void 0;if(t._type==="freedomSlice"){const e=t.cards?.map(o=>({...o,media:b(o.media)})).filter(o=>s(o,["title","text","media"]));return!e||e.length===0?void 0:{...I(t,["_type","sliceId","title","subtitle"]),backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),button:i(t.button),cards:e}}if(t._type==="textRevealSlice"){const e=t.sections?.map(o=>({title:o.title,features:o.features?.map(r=>({media:b(r.media),text:r.text,button:i(r.button)})).filter(r=>s(r,["media","text"]))})).filter(o=>s(o,["title","features"]));return!e||e.length===0?void 0:{...I(t,["_type","sliceId","title"]),backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),sections:e}}if(t._type==="valueSlice")return{...I(t,["_type","sliceId","title","subtitle"]),backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),items:t.items?.map(e=>({...e,media:b(e.media),button:i(e.button)}))};if(t._type==="pathCardsSlice"){const e=t.sections.map(o=>({title:o.title,icon:d(o.icon),cards:o.cards.map(r=>({title:r.title,text:r.text}))}));return!e||e.length===0?void 0:{_type:t._type,backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),title:t.title,sections:e}}if(t._type==="heroSlice"){const e=t.buttons?.map(r=>i(r)).filter(h),o=g(t.linkCards?.map(r=>({title:r.title,button:i(r.button),icon:d(r.icon)})).filter(r=>s(r,["title","button"])));return{_type:t._type,backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),title:t.title,text:t.text,media:b(t.media),buttons:e,linkCards:o}}if(t._type==="servicesSearchSlice"){const e=t.items?.map(o=>({...o,link:i(o.link,{asLink:!0}),icon:d(o.icon),colorIcon:d(o.colorIcon)}));return!e||e.length===0?void 0:{...t,sliceId:l(t.sliceId),items:e}}if(t._type==="wysiwygSlice")return t.text?{...t,sliceId:l(t.sliceId),text:t.text}:void 0;if(t._type==="brandAssetsSlice")return{...t,sliceId:l(t.sliceId),items:t.items?.map(e=>({...e,buttons:g(e.buttons?.map(o=>i(o)).filter(h)),media:b(e.media)})).filter(e=>s(e,["title"]))};if(t._type==="articlesListSlice")return{...t,sliceId:l(t.sliceId),featuredArticles:t.featuredArticles?.map(e=>({...e,image:f(e.image),author:{...e.author,avatar:f(e.author.avatar)}})),items:t.items.map(e=>({...e,image:f(e.image),author:{...e.author,avatar:f(e.author.avatar)}}))};if(t._type==="faqSlice"){const e=t.items?.filter(o=>s(o,["answer","question"]));return{...t,sliceId:l(t.sliceId),button:i(t.button),items:e}}if(t._type==="titleSlice")return t.title?{...t,sliceId:l(t.sliceId),title:t.title}:void 0;if(t._type==="textAndImageSlice")return{...t,sliceId:l(t.sliceId),title:t.title,text:t.text,button:i(t.button),media:b(t.media)};if(t._type==="metricsSlice"){const e=t.metrics?.filter(o=>s(o,["title","value"]))??[];return e.length===0?void 0:{_type:"metricsSlice",backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),metrics:{metrics:e}}}if(t._type==="donutChartSlice")return{...t,button:i(t.button),sliceId:l(t.sliceId)};if(t._type==="cardsSlice"){const e=t.items?.map(o=>{const r=o.cards.map(n=>{if(n._type==="arbitraryMetricsCard"){const u=n.metrics?.map(p=>({...p,icon:d(p.icon)}));return!u||u.length===0?void 0:{...n,title:n.title,text:n.text,button:i(n.button),metrics:u}}if(n._type==="arbitraryMetricsInTableCard"){const u=n.metrics;return!u||u.length===0?void 0:{...n,title:n.title,text:n.text,button:i(n.button),metrics:u}}if(n._type==="blackCard"){const u=g(n.buttons?.map(p=>i(p)).filter(h));return{...n,buttons:u,icon:d(n.icon)}}if(n._type==="blackCardAsLink")return{...n,link:i(n.link,{asLink:!0}),icon:d(n.icon)};if(n._type==="mediaCard"){const u=g(n.buttons?.map(p=>i(p)).filter(h));return{...n,buttons:u,media:b(n.media)}}if(n._type==="poolsMetricCard"){const u=n.poolsMetricPath,p=n.pools;return!u||!p||p.length===0?void 0:{...n,title:n.title,text:n.text,button:i(n.button),poolsMetricPath:u,pools:p}}}).filter(h);if(!(!r||r.length===0))return{maxItemsPerLine:o.maxItemsPerLine,desktopLayout:o.desktopLayout,mobileLayout:o.mobileLayout,lastItem:o.lastItem,title:o.title,cards:r}}).filter(h);return!e||e.length===0?void 0:{...t,sliceId:l(t.sliceId),button:i(t.button),items:e}}if(t._type==="centeredContentSlice"){const e=g(t.videos?.filter(o=>s(o,["url"])));return{...t,text:t.text,secondText:t.secondText,sliceId:l(t.sliceId),buttons:g(t.buttons?.map(o=>i(o)).filter(h)),media:b(t.media),videos:e}}if(t._type==="ecosystemSlice")return t.items?{...I(t,["_type","sliceId","title","subtitle","items"]),backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),button:i(t.button),items:t.items.map(e=>({...e,link:i(e.link,{asLink:!0}),icon:d(e.icon),colorIcon:d(e.colorIcon)}))}:void 0;if(t._type==="homeHeroSlice")return{_type:"homeHeroSlice",backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),title:t.title,subtitle:t.subtitle,media:b(t.media),buttons:g(t.buttons?.map(e=>i(e)).filter(h))};if(t._type==="lastArticlesSlice"){const e=t.items?.map(o=>({...o,image:f(o.image),author:{...o.author,avatar:f(o.author.avatar)}}));return!e||e.length===0?void 0:{_type:"lastArticlesSlice",backgroundColor:t.backgroundColor,title:t.title,subtitle:t.subtitle,sliceId:l(t.sliceId),button:i(t.button),items:e}}if(t._type==="techSlice")return{...I(t,["_type","sliceId","title","text","items"]),backgroundColor:t.backgroundColor,sliceId:l(t.sliceId),button:i(t.button),items:t.items?.map(e=>({...e,icon:d(e.icon)})).filter(e=>s(e,["name","icon"]))};if(t._type==="tableSlice"){const e=t.lines?.map(r=>({...r,icon:d(r.icon)})).filter(r=>s(r,["text"])),o=t.columns?.map(r=>({...r,icon:d(r.icon),button:i(r.button)})).filter(r=>s(r,["name","values"]));return!e||!o?void 0:{_type:"tableSlice",sliceId:l(t.sliceId),backgroundColor:t.backgroundColor,title:t.title,text:t.text,lines:e,columns:o}}if(t._type==="swapSlice")return{_type:"swapSlice",sliceId:l(t.sliceId),backgroundColor:t.backgroundColor,btcSellValue:t.btcSellValue,swapLink:i(t.swapLink,{asLink:!0}),btcPriceMetric:t.btcPriceMetric,ethPriceMetric:t.ethPriceMetric};if(t._type==="centeredCardsSlice"){const e=g(t.cards?.map(o=>({...o,media:b(o.media)})).filter(o=>s(o,["title","text","media"])));return e?{_type:"centeredCardsSlice",sliceId:l(t.sliceId),backgroundColor:t.backgroundColor,title:t.title,button:i(t.button),cards:e}:void 0}if(t._type==="centeredContentWithBackgroundSlice")return{_type:"centeredContentWithBackgroundSlice",sliceId:l(t.sliceId),backgroundColor:t.backgroundColor,title:t.title,text:t.text,buttons:g(t.buttons?.map(e=>i(e)).filter(h)),media:b(t.media)}}}).filter(h)}export{g as h,M as p,A as s};
