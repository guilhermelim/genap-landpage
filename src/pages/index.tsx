import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Confetti from "react-confetti";
import { Container, Box } from "@mui/material";
import ButtonAppBar from "@/components/ButtonAppBar";
import { Step, StepLayout } from "@/root/src/components/Step";
import { Step0, StepForm, StepCompleted } from "../sections/steps";
import FingerprintComponent from "@/components/FingerprintComponent"; // Importando o componente
import { createLeed, updateLeed } from "@/services/leed.service";
import hasDifference from "@/utils/hasDifference";
import usePersistentState from "@/hooks/usePersistentState";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [numberOfSteps, setNumberOfSteps] = useState<number>(5);
  const [indexIncrement, setIndexIncrement] = useState<number>(0);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [queryParams, setQueryParams] = useState<any>({});

  const [id, setId] = useState(null);
  // const [id, setId] = usePersistentState("id", null, 1000 * 60 * 60 * 24);

  const [leed, setLeed] = useState<any>({});

  const [fingerprintData, setFingerprintData] = useState<any>(); // State para armazenar os dados de impressão digital

  const StepConditionRenderer = ({
    condition,
    children,
  }: {
    condition?: {
      step: number;
      index?: number;
      value?: string;
      notEqualValueCheck?: boolean;
      onConditionSatisfied?: () => void;
    };
    children: React.ReactNode;
  }) => {
    const isStepSatisfied = step === condition?.step;

    const isValueConditionProvided = condition?.index && condition?.value;
    const isValueConditionSatisfied =
      isValueConditionProvided &&
      selectedOptions.some(
        (option) =>
          option.index === condition.index &&
          (condition.notEqualValueCheck
            ? option.value !== condition.value
            : option.value === condition.value)
      );

    const SatisfiedCondition =
      isStepSatisfied &&
      (!isValueConditionProvided || isValueConditionSatisfied);

    React.useEffect(() => {
      if (SatisfiedCondition && condition.onConditionSatisfied) {
        condition.onConditionSatisfied();
      }
    }, [SatisfiedCondition, condition, condition?.onConditionSatisfied]);

    return <>{SatisfiedCondition && <>{children}</>}</>;
  };

  const handleOptionSelection = (value: any) => {
    const optionExists = (index: number) =>
      selectedOptions.some((option) => option.index === index);

    const removeOption = (index: number) =>
      selectedOptions.filter((option) => option.index !== index);

    const addOption = (list: any[], value: any) =>
      [...list, value].sort((a, b) => a.index - b.index);

    const index = value.index;
    optionExists(index)
      ? setSelectedOptions(addOption(removeOption(index), value))
      : setSelectedOptions(addOption(selectedOptions, value));
  };

  const handleNextStep = (value: any) => {
    handleOptionSelection(value);
    setStep((prevStep) => prevStep + 1);
  };

  const updateLeedHelper = (
    queryParams: any,
    selectedOptions: any,
    fingerprintData: any
  ) => {
    const newLeed = {
      queryParams,
      selectedOptions,
      fingerprinting: fingerprintData,
    };

    if (hasDifference(leed, newLeed)) {
      setLeed(newLeed);
    }
  };

  const updateQueryParamsHelper = (router: NextRouter) => {
    const params = router.query;
    setQueryParams(params);
  };

  const detectLeedChangesHelper = (leed: any): boolean => {
    const hasNonEmptyLeed = () => {
      return (
        Object.keys(leed).length !== 0 &&
        ((leed.fingerprinting !== null && leed.fingerprinting !== undefined) ||
          Object.values(leed.queryParams).length > 0 ||
          leed.selectedOptions.length > 0)
      );
    };

    return hasNonEmptyLeed();
  };

  const createAndUpdateLeed = async (leed: any) => {
    const create = async (leed: any): Promise<boolean> => {
      try {
        const response = await createLeed(leed);
        if (response.status === 200) {
          setId(response.data.date._id);
          console.log("API: ", response.data.message);
          return true;
        } else {
          console.error("Erro ao criar o lead:", response.data.error);
          return false;
        }
      } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return false;
      }
    };

    const update = async (id: string, leed: any): Promise<boolean> => {
      try {
        const response = await updateLeed(id, leed);
        if (response.status === 200) {
          console.log("API: ", response.data.message);
          return true;
        } else {
          console.error("Erro ao atualizar o lead:", response.data.error);
          return false;
        }
      } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return false;
      }
    };

    if (id) {
      const updateSuccess = await update(id, leed);
      if (!updateSuccess) {
        await create(leed);
      }
    } else {
      await create(leed);
    }
  };

  useEffect(() => {
    updateLeedHelper(queryParams, selectedOptions, fingerprintData);
    updateQueryParamsHelper(router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, selectedOptions, fingerprintData, router.query]);

  useEffect(() => {
    if (detectLeedChangesHelper(leed)) {
      console.log("leed atualizado:", leed);
      (async () => {
        await createAndUpdateLeed(leed);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leed]);

  return (
    <>
      <Box>
        {step === 6 + indexIncrement && (
          <Confetti
            recycle={false}
            numberOfPieces={2_000}
            tweenDuration={20000}
          />
        )}{" "}
        <FingerprintComponent setFingerprintData={setFingerprintData} />
        <ButtonAppBar />
        <Container component="main" maxWidth="xl">
          <StepLayout
            step={step}
            setStep={setStep}
            numberOfSteps={numberOfSteps}
          >
            <StepConditionRenderer
              condition={{
                step: 0,
              }}
            >
              <Step0 nextStep={handleNextStep} />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 1,
              }}
            >
              <Step
                name="O que você precisa?"
                index={1}
                ask="O que {você} precisa?"
                explain="São só algumas perguntas para que nossa equipe possa entrar em contato com você!\nBasta clicar no botão de casa opção ou arrastar a tela para baixo para mais opções."
                options={[
                  {
                    value: "Aplicativo",
                    icon: "fluent:phone-tablet-24-filled",
                    title: "Aplicativo",
                    desc: "Para desenvolvimento de soluções para dispositivos móveis.",
                  },
                  {
                    value: "Software",
                    icon: "iconoir:laptop-dev-mode",
                    title: "Software",
                    desc: "Para desenvolvimento de sistemas locais",
                  },
                  {
                    value: "Website",
                    icon: "mdi:web",
                    title: "Website",
                    desc: "Para desenvolvimento de sistemas de acesso remoto.",
                  },
                  {
                    value: "Não tenho certeza",
                    icon: "pepicons-pencil:handshake",
                    title: "Não tenho certeza",
                    desc: "Se você ainda está decidindo qual plataforma usar.",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 2,
                index: 1,
                value: "Aplicativo",
                notEqualValueCheck: true,
                onConditionSatisfied: () => {
                  setNumberOfSteps(5);
                  setIndexIncrement(0);
                },
              }}
            >
              <></>
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 2,
                index: 1,
                value: "Aplicativo",
                onConditionSatisfied: () => {
                  setNumberOfSteps(6);
                  setIndexIncrement(1);
                },
              }}
            >
              <>
                <Step
                  name="Qual é a plataforma do Aplicativo?"
                  index={2}
                  ask="O que {você} precisa?"
                  explain="São só algumas perguntas para que nossa equipe possa entrar em contato com você!"
                  options={[
                    {
                      value: "Android",
                      icon: "uiw:android",
                      title: "Android",
                      desc: "Possui quase 75% dos usuários no mundo.",
                    },
                    {
                      value: "iOS",
                      icon: "bi:apple",
                      title: "iOS",
                      desc: "Conhecido por sua segurança e base de usuários fiéis.",
                    },
                    {
                      value: "Multiplataforma",
                      icon: "pepicons-print:smartphone-cutout",
                      title: "Multiplataforma",
                      desc: "Priorize segurança e acessibilidade.",
                    },
                  ]}
                  handleOnClick={handleNextStep}
                />
              </>
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 2 + indexIncrement,
              }}
            >
              <Step
                name="Seu projeto será integrado a algum outro sistema?"
                index={2 + indexIncrement}
                ask="Seu projeto será {integrado} a algum outro sistema?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Sim",
                    icon: "dashicons:yes-alt",
                    title: "Sim",
                    desc: "Vai ter integração com 1 ou mais sistemas.",
                  },
                  {
                    value: "Não",
                    icon: "material-symbols:block",
                    title: "Não",
                    desc: "Não vou precisar de nenhuma integração com outros sistemas.",
                  },
                  {
                    value: "Não Sei",
                    icon: "ph:question",
                    title: "Não Sei",
                    desc: "Gostaria de uma recomendação sobre essa etapa.",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 3 + indexIncrement,
              }}
            >
              <Step
                name="QQual é o estágio atual do seu projeto?"
                index={3 + indexIncrement}
                ask="Qual é o {estágio} atual do seu projeto?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Tenho apenas uma ideia.",
                    icon: "el:idea-alt",
                    title: "Tenho apenas uma ideia.",
                    desc: "",
                  },
                  {
                    value: "Já tenho o escopo do que preciso.",
                    icon: "f7:scope",
                    title: "Já tenho o escopo do que preciso.",
                    desc: "",
                  },
                  {
                    value: "Procuro uma Consultoria.",
                    icon: "game-icons:team-idea",
                    title: "Procuro uma Consultoria.",
                    desc: "",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 4 + indexIncrement,
              }}
            >
              <Step
                name="E qual seria a urgência do projeto?"
                index={4 + indexIncrement}
                ask="E qual seria a {urgência} do projeto?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Quero começar logo!",
                    icon: "ant-design:alert-filled",
                    title: "Quero começar logo!",
                    desc: "",
                  },
                  {
                    value: "Não tenho muita presa",
                    icon: "material-symbols:quiet-time",
                    title: "Não tenho muita presa",
                    desc: "",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer condition={{ step: 5 + indexIncrement }}>
              <StepForm nextStep={handleNextStep} index={5 + indexIncrement} />
            </StepConditionRenderer>

            <StepConditionRenderer condition={{ step: 6 + indexIncrement }}>
              <StepCompleted
                nextStep={handleNextStep}
                index={6 + indexIncrement}
              />
            </StepConditionRenderer>
          </StepLayout>
        </Container>
      </Box>
    </>
  );
}
