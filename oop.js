

function class1() {

  function private1() {
	console.log('private stuff');
  }
  //public function
  this.function1 = new function() {
	private1();
	console.log('DO STUFF');
  };
  //public function
  this.function2 = new function() {
	console.log('Do some more stuff');
  };
}


var c = new class1();

c.function1();

c.function2();
