import React from 'react';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
};

export default withRouter(({ location, children, history }) => {
  return (
    <TransitionGroup
      childFactory={child =>
        React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
      }
    >
      <CSSTransition key={location.pathname} timeout={1000}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
});
