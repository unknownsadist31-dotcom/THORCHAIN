import{p as b,h as m,d as f,i as S,a as y,j as I,b as _,s as u}from"./BT1gpDxZ.js";import{p as o,v,g as $}from"./CZTMkqHr.js";import{g as d}from"./73TEb1xW.js";import{p as T,s as g}from"./NPFGtUFG.js";import{w}from"./C0Ggs7Mr.js";const h=200;function U(e,t=h){const r=w(e).trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(r/(t??h)))}const A=$`
*[_type == "article" && slug.current == $slug][0] {
  title,
  date,
  tags[]->{
    name,
    "slug": slug.current
  },
  author->{ ${y} },
  image { ${v} },
  "seoImage": image { ${I} },
  "readingTimeLabelTemplate": ${d("articleMinRead","{{minute}} min read")},

  "slices": [
    ...${g},
    ...select(
      showCommonSlices == true =>
        *[_type == 'articleCommonSlices'][0]{ ${g} }.slices,
      []
    )
  ],

  "related": {
    "title": ${d("relatedArticlesTitle","Related articles")},
    "items": *[
      _type == "article" &&
      _id != ^._id &&
      (
        (count(^.tags) > 0 && references(^.tags[]._ref)) ||
        (count(^.tags) == 0)
      )
    ] | order(score desc, date desc)[0...15] {
      "score": count(tags[@._ref in ^.tags[]._ref]),
      ${_}
    }
  },

  "globalSeo": *[_type == 'globalSeo'][0].seo {
    ${u}
  },

  seo {
    ${u}
    externalCanonicalUrl
  }
}
`;function E(e){if(e)try{return new URL(e).origin}catch{return}}function C(e,t){if(!e)return;const a=e.seo?.ogImage??e.globalSeo?.ogImage??e.seo?.twitterImage??e.globalSeo?.twitterImage,r=E(t.canonicalUrl),s=r&&e.author.slug?`${r}/authors/${e.author.slug}`:void 0,l=e.seo?.description??e.globalSeo?.description,n=e.globalSeo?.ogSiteName??"THORChain",i=m({"@context":"https://schema.org","@type":"BlogPosting","@id":t.canonicalUrl?`${t.canonicalUrl}#article`:void 0,mainEntityOfPage:t.canonicalUrl?{"@type":"WebPage","@id":t.canonicalUrl}:void 0,headline:e.title,description:l,image:S(a),datePublished:e.date,author:m({"@type":"Person",name:e.author.name,url:s}),publisher:f(n),url:t.canonicalUrl});return JSON.stringify(i,null,2)}function N(e,t={}){if(!e)return;let a=0;const r=T(e.slices);r&&(a=r.reduce((i,c)=>(c._type==="wysiwygSlice"&&(i+=U(c.text)),i),0),r.unshift({_type:"articleHeroSlice",article:{title:e.title,tags:e.tags,author:{name:e.author.name,avatar:o(e.author.avatar),slug:e.author.slug},date:e.date,image:o(e.image)},readingTime:a>0?a:void 0,readingTimeLabelTemplate:e.readingTimeLabelTemplate}),e.related.items.length>0&&r.push({_type:"relatedArticlesSlice",title:e.related.title,items:e.related.items.map(i=>({...i,image:o(i.image),author:{...i.author,avatar:o(i.author.avatar)}}))})),e.seo&&(e.seo.ogImage=e.seo.ogImage??e.seoImage,e.seo.twitterImage=e.seo.twitterImage??e.seoImage);const s=e.seo?.structuredContent?.code?.trim()?void 0:C(e,t),{head:l,seo:n}=b(e.globalSeo,e.seo,{additionalStructuredContent:[s]});return{slices:r,seo:n,head:l}}export{A as a,N as p};
