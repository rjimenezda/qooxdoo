/* ************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#package(simpleterminators)

************************************************************************ */

qx.OO.defineClass("qx.ui.embed.LinkEmbed", qx.ui.embed.HtmlEmbed, 
function(vHtml, vUri, vTarget)
{
  qx.ui.embed.HtmlEmbed.call(this, vHtml);

  if (typeof vUri != qx.Const.TYPEOF_UNDEFINED) {
    this.setUri(vUri);
  };

  if (typeof vTarget != qx.Const.TYPEOF_UNDEFINED) {
    this.setTarget(vTarget);
  };
});






/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/

/*!
  Any valid html URI
*/
qx.OO.addProperty({ name : "uri", type : qx.Const.TYPEOF_STRING, defaultValue : "#", impl : "html" });

/*!
  Any valid html target
*/
qx.OO.addProperty({ name : "target", type : qx.Const.TYPEOF_STRING, defaultValue : "_blank", impl : "html" });






/*
---------------------------------------------------------------------------
  UTILITIES
---------------------------------------------------------------------------
*/

qx.ui.embed.LinkEmbed.LINK_START = "<a target='";
qx.ui.embed.LinkEmbed.HREF_START = "' href='";
qx.ui.embed.LinkEmbed.HREF_STOP = "'>";
qx.ui.embed.LinkEmbed.LINK_STOP = "</a>";

qx.Proto._syncHtml = function()
{
  var vHtml = [];

  vHtml.push(qx.ui.embed.LinkEmbed.LINK_START);
  vHtml.push(this.getTarget());
  vHtml.push(qx.ui.embed.LinkEmbed.HREF_START);
  vHtml.push(this.getUri());
  vHtml.push(qx.ui.embed.LinkEmbed.HREF_STOP);
  vHtml.push(this.getHtml());
  vHtml.push(qx.ui.embed.LinkEmbed.LINK_STOP);

  this.getElement().innerHTML = vHtml.join(qx.constant.Core.EMPTY);
};
