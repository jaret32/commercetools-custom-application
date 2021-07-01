import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Route, Switch, Link } from 'react-router-dom';
import { ListIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import ProductView from '../product-view';
import ProductsView from '../products-view';
import messages from './messages';
import styles from './main-view.mod.css';

const MainView = (props) => {
  const intl = useIntl();

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <div className={styles['nav-header']}>
          <Spacings.Inline scale="s">
            <FlatButton
              as={Link}
              to={`${props.match.url}/products`}
              icon={<ListIcon />}
              label={intl.formatMessage(messages.labelProductsLink)}
            />
          </Spacings.Inline>
        </div>
        <Switch>
          <Route path={`${props.match.path}/products/:id`} component={ProductView} />
          <Route path={`${props.match.path}/products`} component={ProductsView} />
        </Switch>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
MainView.displayName = 'MainView';
MainView.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MainView;
