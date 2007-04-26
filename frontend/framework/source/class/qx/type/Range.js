/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * This manager is used by all objects which needs ranges like qx.ui.form.Spinner, ...
 */
qx.Class.define("qx.type.Range",
{
  extend : qx.core.Target,




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events: {
    "change" : "qx.event.type.Event"
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** current value of the Range object */
    value :
    {
      check : "!isNaN(value)&&value>=this.getMin()&&value<=this.getMax()",
      init : 0,
      apply : "_modifyValue",
      event : "change"
    },

    /** minimal value of the Range object */
    min :
    {
      check : "Number",
      init : -Infinity,
      apply : "_modifyMin",
      event : "change"
    },

    /** maximal value of the Range object */
    max :
    {
      check : "Number",
      init : Infinity,
      apply : "_modifyMax",
      event : "change"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {Boolean} TODOC
     */
    _modifyMax : function(propValue, propOldValue, propData) {
      this.setValue(Math.min(this.getValue(), propValue));
    },


    /**
     * TODOC
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {Boolean} TODOC
     */
    _modifyMin : function(propValue, propOldValue, propData) {
      this.setValue(Math.max(this.getValue(), propValue));
    }
  }
});
