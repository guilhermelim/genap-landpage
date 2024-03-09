import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Confetti from "react-confetti";
import { Container, Box } from "@mui/material";
import ButtonAppBar from "@/components/ButtonAppBar";
import { Step, StepLayout } from "@/root/src/components/Step";
import { Step0, Step7, Step8 } from "../sections/steps";
import FingerprintComponent from "@/components/FingerprintComponent"; // Importando o componente
import { createLeed, updateLeed } from "@/services/leed.service";
import hasDifference from "@/utils/hasDifference";
import usePersistentState from "@/hooks/usePersistentState";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [queryParams, setQueryParams] = useState<any>({});

  const [id, setId] = usePersistentState("id", null, 1000 * 60 * 60 * 24);

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

    return (
      <>
        {isStepSatisfied &&
          (!isValueConditionProvided || isValueConditionSatisfied) && (
            <>{children}</>
          )}
      </>
    );
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
      {step === 8 && (
        <Confetti
          recycle={false}
          numberOfPieces={2_000}
          tweenDuration={20000}
        />
      )}
      <Box>
        <FingerprintComponent setFingerprintData={setFingerprintData} />

        <ButtonAppBar />
        <Container component="main" maxWidth="xl">
          <StepLayout step={step} setStep={setStep}>
            <StepConditionRenderer condition={{ step: 0 }}>
              <Step0 nextStep={handleNextStep} />
            </StepConditionRenderer>

            <StepConditionRenderer condition={{ step: 1 }}>
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
                    desc: "Para você que precisa desenvolver algo para celulares",
                  },
                  {
                    value: "Software",
                    icon: "iconoir:laptop-dev-mode",
                    title: "Software",
                    desc: "Para você que precisa desenvolver um sistema local",
                  },
                  {
                    value: "Website",
                    icon: "mdi:web",
                    title: "Website",
                    desc: "Para você que precisa desenvolver um sistema de acesso remoto",
                  },
                  {
                    value: "Terceirização",
                    icon: "pepicons-pencil:handshake",
                    title: "Terceirização",
                    desc: "Para você que precisa sempre desenvolver e quer uma equipe especializada",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{ step: 2, index: 1, value: "Aplicativo" }}
            >
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
                    desc: "Android já possui quase 75% dos usuários no mundo",
                  },
                  {
                    value: "iOS",
                    icon: "bi:apple",
                    title: "iOS",
                    desc: "iOS é conhecido por ser mais seguro e ter usuários mais fiéis",
                  },
                  {
                    value: "Multiplataforma",
                    icon: "pepicons-print:smartphone-cutout",
                    title: "Multiplataforma",
                    desc: "Por que não segurança e acessibilidade?",
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
              }}
            >
              <Step
                name="Login"
                index={2}
                ask="Caso exista, como você quer que os
              usuários de sua plataforma {efetuem seu login}?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Login por E-mail",
                    icon: "ic:baseline-email",
                    title: "Login por E-mail",
                    desc: "Um sistema mais simples, porém efetivo",
                  },
                  {
                    value: "Nenhum",
                    icon: "material-symbols:block",
                    title: "Nenhum",
                    desc: "Acho que não vai precisar de login",
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
                step: 3,
              }}
            >
              <Step
                name="Vai ser integrado com outro sistema?"
                index={3}
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
                step: 4,
              }}
            >
              <Step
                name="Qual nível o projeto está?"
                index={4}
                ask="Qual {nível} o projeto está?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Possuo a ideia, porém não tenho o detalhamento.",
                    icon: "",
                    title: "Possuo a ideia, porém não tenho o detalhamento.",
                    desc: "",
                  },
                  {
                    value:
                      "Já possuo um descritivo e gostaria de receber um orçamento.",
                    icon: "",
                    title:
                      "Já possuo um descritivo e gostaria de receber um orçamento.",
                    desc: "",
                  },
                  {
                    value: "Já comecei o desenvolvimento.",
                    icon: "",
                    title: "Já comecei o desenvolvimento.",
                    desc: "",
                  },
                  {
                    value:
                      "Procuro terceirizar minha equipe de desenvolvimento",
                    icon: "",
                    title:
                      "Procuro terceirizar minha equipe de desenvolvimento",
                    desc: "",
                  },
                  {
                    value: "Procuro uma equipe de sustentação",
                    icon: "",
                    title: "Procuro uma equipe de sustentação",
                    desc: "",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 5,
              }}
            >
              <Step
                name="E qual seria a urgência do projeto?"
                index={5}
                ask="E qual seria a {urgência} do projeto?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Quero começar a desenvolver ainda essa semana",
                    icon: "",
                    title: "Quero começar a desenvolver ainda essa semana",
                    desc: "",
                  },
                  {
                    value: "Quero começar a desenvolver na próxima semana",
                    icon: "",
                    title: "Quero começar a desenvolver na próxima semana",
                    desc: "",
                  },
                  {
                    value: "Quero começar a desenvolver ainda esse mês",
                    icon: "",
                    title: "Quero começar a desenvolver ainda esse mês",
                    desc: "",
                  },
                  {
                    value: "Quero começar a desenvolver no próximo mês",
                    icon: "",
                    title: "Quero começar a desenvolver no próximo mês",
                    desc: "",
                  },
                  {
                    value: "Não tenho urgência para desenvolver o projeto",
                    icon: "",
                    title: "Não tenho urgência para desenvolver o projeto",
                    desc: "",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer
              condition={{
                step: 6,
              }}
            >
              <Step
                name="Por onde você nos conheceu?"
                index={6}
                ask="Por onde você nos {conheceu}?"
                explain="Agora vamos entender como irá funcionar, ok?"
                options={[
                  {
                    value: "Google",
                    icon: "",
                    title: "Google",
                    desc: "",
                  },
                  {
                    value: "Instagram",
                    icon: "",
                    title: "Instagram",
                    desc: "",
                  },
                  {
                    value: "Facebook",
                    icon: "",
                    title: "Facebook",
                    desc: "",
                  },
                  {
                    value: "LinkedIn",
                    icon: "",
                    title: "LinkedIn",
                    desc: "",
                  },
                  {
                    value: "Indicação",
                    icon: "",
                    title: "Indicação",
                    desc: "",
                  },
                  {
                    value: "Plataforma de contratação",
                    icon: "",
                    title: "Plataforma de contratação",
                    desc: "",
                  },
                  {
                    value: "Outro",
                    icon: "",
                    title: "Outro",
                    desc: "",
                  },
                ]}
                handleOnClick={handleNextStep}
              />
            </StepConditionRenderer>

            <StepConditionRenderer condition={{ step: 7 }}>
              <Step7 nextStep={handleNextStep} />
            </StepConditionRenderer>

            <StepConditionRenderer condition={{ step: 8 }}>
              <Step8 nextStep={handleNextStep} />
            </StepConditionRenderer>
          </StepLayout>
        </Container>
      </Box>
    </>
  );
}
