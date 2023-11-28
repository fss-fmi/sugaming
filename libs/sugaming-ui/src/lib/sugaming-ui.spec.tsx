import { render } from '@testing-library/react';

import { SugamingUi } from './sugaming-ui';

describe('SugamingUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SugamingUi />);
    expect(baseElement).toBeTruthy();
  });
});
