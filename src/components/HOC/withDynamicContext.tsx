import React, { createContext, ComponentType } from 'react';

// Тип для значений контекста
export interface DynamicContextValue {
    contextName: string;
}

// Тип для пропсов, которые будут переданы в оборачиваемый компонент
interface WithDynamicContextProps {
    DynamicContext: React.Context<DynamicContextValue> | undefined;
}

// Тип для пропсов оборачиваемого компонента
export type WrappedComponentProps<P = {}> = P & WithDynamicContextProps;


//TODO: Надо сделать относительно фреймтайпа поля и функции для установки полей (СТЕЙТ), которые будут запихнуты в контекст

export const withDynamicContext = <P extends object>(
    WrappedComponent: ComponentType<WrappedComponentProps<P>>,
    contextName: string = 'DynamicContext'
) => {
    return (props: P) => {
        // Создаем новый контекст
        const DynamicContext = createContext<DynamicContextValue>({ contextName });

        // Возвращаем новый компонент, который будет использовать этот контекст
        return (
            <DynamicContext.Provider value={{ contextName }}>
                <WrappedComponent {...props} DynamicContext={DynamicContext} />
            </DynamicContext.Provider>
        );
    };
};

//Как использовать
// const MyComponentWithDynamicContext = withDynamicContext(MyComponent, 'MyDynamicContext');
