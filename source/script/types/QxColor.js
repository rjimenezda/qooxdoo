function QxColor(v)
{
  var v1 = QxColor.read(v);
  var v2 = QxColor.RGB2CSS(v1);

  return v2;
};

QxColor.m_hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
QxColor.r_hex3 = /^#[0-9A-Fa-f]{3}$/;
QxColor.r_hex6 = /^#[0-9A-Fa-f]{6}$/;
QxColor.r_cssrgb = /^rgb\([0-9]{1,3}\.{0,1}[0-9]*,\s*[0-9]{1,3}\.{0,1}[0-9]*,\s*[0-9]{1,3}\.{0,1}[0-9]*\)$/;

QxColor.r_rgb = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;
QxColor.r_number = /^[0-9]{1,3}\.{0,1}[0-9]*$/;
QxColor.r_percent = /^[0-9]{1,3}\.{0,1}[0-9]*%$/;

QxColor.os = [ "activeborder", "activecaption", "appworkspace", "background", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "captiontext", "graytext", "highlight", "highlighttext", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infobackground", "infotext", "menu", "menutext", "scrollbar", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "window", "windowframe", "windowtext" ];

QxColor.names = {
  white : [255,255,255],
  black : [0,0,0],
  grey : [128,128,128],
  gray : [128,128,128],
  red : [255,0,0],
  green : [0,128,0],
  blue : [0,0,255],
  yellow : [255,255,0],
  orange : [255,165,0],
  purple : [128,0,128],
  cyan : [0,255,255],
  magenta : [255,0,255]
};

QxColor.read = function(v)
{
  if (v == null || v == "")
  {
    return null;
  }
  else if (v == "transparent")
  {
    return v;
  }
  else if (typeof v == "object")
  {
    if (typeof v.length == "undefined" || v.length == 0)
      throw new Error("Malformed Object");

    if (v.length == 1)
      return [ v[0], v[0], v[0] ];
    else if (v.length == 3)
      return v;
    else
      throw new Error("Malformed Object");
  }
  else if (v == "false" || v == false)
  {
    return [ 0, 0, 0 ];
  }
  else if (v == "true" || v == true)
  {
    return [ 255, 255, 255 ];
  }
  else if (typeof QxColor.names[v] == "object")
  {
    return QxColor.names[v];
  }
  else if (QxColor.os.contains(v.toString().toLowerCase()))
  {
    return v;
  }
  else if (QxColor.r_hex3.test(v))
  {
    var r = [];
    var s;

    v = v.toUpperCase();

    for (var i=0; i<3; i++)
    {
      s = QxColor.m_hex.indexOf(v.charAt(i+1));
      r[i] = (s * 16) + s;
    };

    return r;
  }
  else if (QxColor.r_hex6.test(v))
  {
    var r = [];
    var s1, s2;

    v = v.toUpperCase();

    for (var i=0; i<3; i++)
    {
      s1 = QxColor.m_hex.indexOf(v.charAt((i*2)+1));
      s2 = QxColor.m_hex.indexOf(v.charAt((i*2)+2));
      r[i] = (s1 * 16) + s2;
    };

    return r;
  }
  else if (QxColor.r_cssrgb.test(v) || QxColor.r_rgb.test(v))
  {
    if (QxColor.r_cssrgb.test(v)) {
      v = v.substring(4,v.length-1);
    };

    v = v.split(/,\s*/);

    for (var i=0; i<3; i++)
    {
      v[i] = Math.round(v[i]);
      if (v[i]>255||v[i]<0) {
        throw new Error("Malformed RGB color value");
      };
    };

    return v;
  }
  else if (QxColor.r_number.test(v))
  {
    v = Math.round(parseFloat(v));
    if (isNaN(v)) {
      throw new Error("Malformed numeric color value");
    };

    return [ v, v, v ];
  }
  else if (QxColor.r_percent.test(v))
  {
    v1 = Math.round(255 * parseFloat(v.replace("%", "")) / 100);
    if (v>255||v<0) {
      throw new Error("Malformed percent color value");
    };

    return [ v, v, v ];
  };

  QxDebug("QxColor", "Failed to read color value: " + v);
  return [0, 0, 0];
};

QxColor.RGB2CSS = function()
{
  if (arguments.length == 3)
  {
    return "rgb(" + arguments[0] + "," + arguments[1] + "," + arguments[2] + ")";
  }
  else if (arguments.length == 1)
  {
    if (typeof arguments[0] == "string")
      return arguments[0];
    else if (arguments[0] == null)
      return "";
    else
      return "rgb(" + arguments[0][0] + "," + arguments[0][1] + "," + arguments[0][2] + ")";
  };

  return;
};

QxColor.RGB2HSB = function(r,g,b)
{
  var hue, saturation, brightness;

  r = parseFloat(r);
  g = parseFloat(g);
  b = parseFloat(b);

  var hsbvals = new Array(3);

  var cmax = (r > g) ? r : g;
  if (b > cmax) cmax = b;

  var cmin = (r < g) ? r : g;
  if (b < cmin) cmin = b;

  brightness = cmax / 255.0;

  if (cmax != 0)
  {
    saturation = (cmax - cmin) / cmax;
  }
  else
  {
    saturation = 0;
  };

  if (saturation == 0)
  {
    hue = 0;
  }
  else
  {
    var redc = (cmax - r) / (cmax - cmin);
    var greenc = (cmax - g) / (cmax - cmin);
    var bluec = (cmax - b) / (cmax - cmin);

    if (r == cmax)
    {
      hue = bluec - greenc;
    }
    else if (g == cmax)
    {
      hue = 2.0 + redc - bluec;
    }
    else
    {
      hue = 4.0 + greenc - redc;
    };

    hue = hue / 6.0;
    if (hue < 0) hue = hue + 1.0;
  };

  hsbvals[0] = Math.round(hue * 360);
  hsbvals[1] = Math.round(saturation*100);
  hsbvals[2] = Math.round(brightness*100);

  return hsbvals;
};

QxColor.HSB2RGB = function(h,s,b) {
  var i, f, p, q, t, retval;

  h = parseFloat(h/360);
  s = parseFloat(s/100);
  b = parseFloat(b/100);

  if(h >= 1.0) h %= 1.0;
  if(s > 1.0) s = 1.0;
  if(b > 1.0) b = 1.0;

  var tov = Math.floor(255 * b);

  if(s == 0.0)
  {
    retval = new Array(tov,tov,tov);
  }
  else
  {
    h *= 6.0;

    i = Math.floor(h);

    f = h - i;

    p = Math.floor(tov * (1.0 - s));
    q = Math.floor(tov * (1.0 - (s * f)));
    t = Math.floor(tov * (1.0 - (s * (1.0  - f))));

    if(i == 0) retval = new Array(tov, t, p);
    if(i == 1) retval = new Array(q, tov, p);
    if(i == 2) retval = new Array(p, tov, t);
    if(i == 3) retval = new Array(p, q, tov);
    if(i == 4) retval = new Array(t, p, tov);
    if(i == 5) retval = new Array(tov, p, q);
  };

  return retval;
};
