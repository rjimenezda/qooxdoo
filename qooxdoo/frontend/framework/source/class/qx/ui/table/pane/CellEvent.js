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
     * David Perez Carmona (david-perez)

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/** A cell event instance contains all data for mouse events related to cells in a table. */
qx.Class.define("qx.ui.table.pane.CellEvent",
{
  extend : qx.event.type.Mouse,


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    row :
    {
      _fast    : true,
      readOnly : true
    },

    column :
    {
      _fast    : true,
      readOnly : true
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
     * @param scroller    {qx.ui.table.pane.Scroller}
     * @param me          {qx.event.type.MouseEvent}
     */
    init : function(scroller, me)
    {
      this.base(arguments, me.getNativeEvent(), 'cell'+qx.lang.String.toFirstUp(me.getType()));
      this._scroller = scroller;
    },


    // overridden
    clone : function()
    {
      var clone = this.base(arguments);
      clone._scroller = this._scroller;
      return clone;
    },


    /**
     * Compute the row where the event has happened.
     *
     * @type member
     * @return {Integer} 0-based row number
     */
    _computeRow : function()
    {
      if (this._row == null)
      {
        this._row = this._scroller._getRowForPagePos(this.getPageX(), this.getPageY());
      }
      return this._row;
    },


    /**
     * Compute the column where the event has happened.
     *
     * @type member
     * @return {Integer} zero based column number
     */
    _computeColumn : function()
    {
      if (this._column == null)
      {
        this._column = this._scroller._getColumnForPageX(this.getPageX());
      }
      return this._column;
    }
  }
});
