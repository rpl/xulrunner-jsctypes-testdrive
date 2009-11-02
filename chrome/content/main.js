/* import js-ctypes */
Components.utils.import("resource://gre/modules/ctypes.jsm");

if(/^Linux/.test(navigator.platform))
  linux_test_ctypes()
else if(/^Win/.test(navigator.platform)) 
  windows_test_ctypes()
else if(/^Mac/.test(navigator.platform)) 
  macos_test_ctypes()

function linux_test_ctypes() {
  /* open a library */
  var libc = ctypes.open("libc.so.6"); 

  /* import a function */
  var puts = libc.declare("puts", /* function name */
                           ctypes.default_abi, /* call ABI */
                           ctypes.int32_t, /* return type */
                           ctypes.string /* argument type */
  );
  var ret = puts("Hello World from js-ctypes!");

  libc.close();
}

function windows_test_ctypes() {
  var lib = ctypes.open("C:\\WINDOWS\\system32\\user32.dll");  
   
  /* Declare the signature of the function we are going to call */  
  var msgBox = lib.declare("MessageBoxW",  
                           ctypes.stdcall_abi,  
                           ctypes.int32_t,  
                           ctypes.int32_t,  
                           ctypes.ustring,  
                           ctypes.ustring,  
                           ctypes.int32_t);  
  var MB_OK = 3;  
   
  var ret = msgBox(0, "Hello world", "title", MB_OK);  
   
  lib.close();  
}


function macos_test_ctypes() {
  /* build a Str255 ("Pascal style") string from the passed-in string */  
     
  function makeStr(str) {  
    return String.fromCharCode(str.length) + str;  
  }  
     
  var carbon = ctypes.open("/System/Library/Frameworks/Carbon.framework/Carbon");  
  
  stdAlert = carbon.declare("StandardAlert",       /* function name */  
                            ctypes.default_abi,    /* ABI type */  
                            ctypes.int16_t,        /* return type */  
                            ctypes.int16_t,        /* alert type */  
                            ctypes.string,         /* primary text */  
                            ctypes.string,         /* secondary text */  
                            ctypes.uint32_t,       /* alert param */  
                            ctypes.int16_t);       /* item hit */  
    
  var hit = 0;  
  var msgErr = makeStr("Carbon Says...");  
  var msgExp = makeStr("We just called the StandardAlert Carbon function from JavaScript!");  
     
  var err = stdAlert(1, msgErr, msgExp, 0, hit);  
     
  carbon.close();  
}