import { useState } from 'react'
import { Button, TextField, MenuItem, CircularProgress } from '@mui/material'
import { useForm, FieldErrors, Controller } from 'react-hook-form'
import { School, SchoolSearchFormValues } from '../types/types'
import axios, { CancelTokenSource } from 'axios'
import SchoolTable from './SchoolTable'


function SchoolSearchForm() {
  const [loading, setLoading] = useState(false)
  const [schoolData, setSchoolData] = useState<School[]>([]);
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  const [inputValues, setInputValues] = useState<SchoolSearchFormValues>({
    target: "",
    radius: 0,
    kind: "小学校",
  })

  const defaultValues = {
    target: "",
    radius: 0,
    kind: "小学校",
  }

  const onsubmit = async (data: SchoolSearchFormValues) => {
    setInputValues(data)
    setLoading(true)
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    try {
      const response = await axios.get(
        "https://area-research-api-r7nrtxuh7a-an.a.run.app/schools",
        {
          cancelToken: source.token,
          params: {
            target: data.target,
            radius: data.radius,
            kind_of_school: data.kind
          }
        }
      )
      setSchoolData(response.data)
      console.log(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false)
      setCancelTokenSource(null);
    }
  }

  const cancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by user.");
    }
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm({
     defaultValues 
  })

  const onerror = (err: FieldErrors<SchoolSearchFormValues>) => {
    console.log(err);
  }

  return (
    <>
      {loading && (
        <>
          <div className="flex flex-col items-center justify-center mt-40">
            <CircularProgress />
          </div>
          <div className="mt-12">
            <Button onClick={cancelRequest} variant="contained" color="secondary">
              キャンセル
            </Button>
          </div>
        </>
      )}
      {!loading && schoolData.length === 0 && (
        <form 
          onSubmit={handleSubmit(onsubmit, onerror)} 
          noValidate
          className="flex flex-col items-center justify-center mt-40">
          <h1 className="text-center text-xl">周辺学校検索</h1>
          <div className="mb-2">
            <TextField label="基準地点" margin="normal"
              {...register("target", {
                required: "基準地点は必須入力です。"
              })} 
              error={"target" in errors}
              helperText={errors.target?.message}
              sx={{ width: '400px' }}
            />
          </div>
          <div className="mb-6">
            <TextField type="number" label="半径（km）" margin="normal"
              {...register("radius", {
                required: "半径は必須入力です。",
                min: {
                  value: 0.5,
                  message: "0.5以上で指定してください。"
                },
                max: {
                  value: 10,
                  message: "10以下で指定してください。"
                }
              })}
              error={"radius" in errors}
              helperText={errors.radius?.message}
              sx={{ width: '400px' }}
            />
          </div>
          <div className="mb-6">
            <Controller
            name="kind"
            control={control}
            defaultValue="小学校"
            rules={{ required: "選択は必須です。" }}
            render={({ field }) => (
              <TextField
                select
                label="校種"
                {...field}
                error={!!errors.kind}
                helperText={errors.kind ? errors.kind.message : ""}
                margin="normal"
                sx={{ width: '400px' }}
                InputProps={{
                  style: { textAlign: 'left' }
                }}
              >
                <MenuItem value="小学校">小学校</MenuItem>
                <MenuItem value="中学校">中学校</MenuItem>
              </TextField>
            )}
            />
          </div>
          
          <div className="mb-4">
            <Button variant="contained"
              type="submit"
              sx={{ width: '400px' }}
            >
              検索
            </Button>
          </div>
        </form>
      )}
      {!loading && schoolData.length > 0 && (
        <SchoolTable schools={schoolData} inputValues={inputValues}/>
      )}
    </>
  )
}

export default SchoolSearchForm
