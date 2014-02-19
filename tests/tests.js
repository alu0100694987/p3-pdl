
var assert = chai.assert;

suite('Ficheros Init', function() {
  
    test('Funcionamiento correcto del header', function() {
        var tokens = lexer('[HEADER]');
		assert.equal(tokens[0].type,'header');
    });
    
    test('Detectando asignacion', function() {
        var tokens = lexer('Nombre = Sawan');
		assert.equal(tokens[0].type,'nameEqualValue');
    });
    
    test('Detectando comentario', function() {
        var tokens = lexer('; Hola mundo soy un comentario ');
		assert.equal(tokens[0].type,'comments');
    });
    test('Detectando espacios en blanco', function() {
        var tokens = lexer(' ');
		assert.equal(tokens[0].type,'blanks');
    });
    
    test('Detectando un posible error', function() {
        var tokens = lexer('@!!!¿¿¿???!!!');
		assert.equal(tokens[0].type,'error');
    });
    
});