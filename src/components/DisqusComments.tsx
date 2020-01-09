import React from 'react';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

const DisqusComments = (props: any) => {
  let disqusConfig = {
    url: props.postURL,
    identifier: 0,
    title: props.postTitle,
  }
  return (
    <>
      <h1>{props.postTitle}</h1>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      /* Post Contents */
      <Disqus config={disqusConfig} />
    </>
  )
}

export default DisqusComments