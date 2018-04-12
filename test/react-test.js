import React from 'react';
import TestUtils from 'react-dom/test-utils';
import chai from 'chai';

const should = chai.should();

import Event from '../views/js/components/event';

describe('Event component', function() {
  it('Renders the event and description',  function() {
    // const url = "http://www.example.com/image.png";
    const description = "Example description";
    const name = "TEST";
    const price = 10;
    const tag = "TEST";
    const location = "NY";

    const renderer = TestUtils.createRenderer();
    renderer.render(<Event description={description} name={name} price={price} tag={tag} location={location} />);
    const result = renderer.getRenderOutput();
    result.props.className.should.equal('content__event');

    const div = result.props.children[0];
    div.type.should.equal('div');
    div.props.children.should.equal(name);
  });
});