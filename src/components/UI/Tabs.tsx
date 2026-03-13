import React, { useMemo } from 'react';

export interface ITab {
  name: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface ITabs {
  active: string;
  setActive: (active: string) => void;
  children: any;
  className?: string;
  tabWrapperClassName?: string;
}

export function Tab(props: ITab) {
  return (
    <div className='h-full'>
      {props.children}
    </div>
  );
}

const Tabs = (props: ITabs) => {
  const tabs = useMemo(
    () => Array.isArray(props.children) ? props.children : [props.children],
    [props.children],
  );

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.props?.name === props.active)!,
    [props.active, tabs],
  );

  return (
    <div className='h-full'>
      <div className={`overflow-hidden ${props.className ?? ''}`}>
        {tabs.map(tab => {
          return (
            <button
              key={tab.props?.name}
              className={
                [
                  'py-2 mr-4 font-medium text-lg cursor-pointer border-b-2',
                  tab === activeTab ? 'text-grey-1 border-gray-800' : 'text-grey-2 border-transparent',
                ].join(' ')
              }
              disabled={tab.props?.disabled}
              onClick={() => props.setActive(tab.props?.name)}
            >
              {tab.props?.name}
            </button>
          );
        })}
      </div>
      
      <div
        className={props.tabWrapperClassName?.concat(' ') ?? '' + 'h-full'}
      >
        {activeTab}
      </div>
    </div>
  )
}

export default Tabs;
