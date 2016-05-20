import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}


test('no options given', t => {
    return run(t, 'input:required::after{content:"*"}', 'input:not(:optional)::after,input:required::after{content:"*"}', { });
});

test('default options passed', t => {
    return run(t, 'input:optional::before{content:"(optional)";}', 'input:not(:required)::before,input:optional::before{content:"(optional)";}', { method: 'shim-all' });
});

test('method shim-optional passed, shall not change ', t => {
    return run(t, 'input:required:{color:blue;}', 'input:required:{color:blue;}', { method: 'shim-optional' });
});

test('method shim-optional passed, shall be shimmed', t => {
    return run(t, 'input:optional::before{content:"(optional)";}', 'input:not(:required)::before,input:optional::before{content:"(optional)";}', { method: 'shim-optional' });
});

test('method shim-required passed, shall not change', t => {
    return run(t, 'input:optional:{color:blue;}', 'input:optional:{color:blue;}', { method: 'shim-required' });
});

test('method shim-required passed, shall be shimmed', t => {
    return run(t, 'input:required{ }', 'input:not(:optional),input:required{ }', { method: 'shim-required' });
});
