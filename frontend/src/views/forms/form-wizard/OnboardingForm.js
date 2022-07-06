// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { getLocalStorage } from 'src/hooks/helpers'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'

const steps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Information'
  },
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Labour Details',
    subtitle: 'Work Information'
  }
]

const defaultValues = {
  firstName: '',
  lastName: '',
  nickName: '',
  phone1: '',
  phone2: '',
  email1: '',
  email2: '',
  since: new Date(),
  streetAddress: '',
  postalCode: '',
  city: '',
  province: '',
  country: '',
  shift: '',
  labour: '',
  vehicle: ''
}

const OnboaringForm = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [typeSubmit, setTypeSubmit] = useState('button')
  const [basicPicker, setBasicPicker] = useState(new Date())

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      // setTypeSubmit('submit')
      toast.success('Form Submitted')
    }
  }

  // YUP validation rules
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    nickName: yup.string().required(),
    phone1: yup.string().required(),
    phone2: yup.string().required(),
    email1: yup.string().email().required(),
    email2: yup.string().email().required(),
    streetAddress: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
    shift: yup.string().required(),
    labour: yup.boolean().required(),
    vehicle: yup.boolean().required()
  })

  // React Hook controller
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // Handle form submit
  const onSubmit = data => {
    const {
      firstName,
      lastName,
      nickName,
      phone1,
      phone2,
      email1,
      email2,
      streetAddress,
      city,
      province,
      postalCode,
      country,
      shift,
      labour,
      vehicle
    } = data

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update',
      data: {
        firstName,
        lastName,
        nickName,
        phone1,
        phone2,
        email1,
        email2,
        streetAddress,
        city,
        province,
        postalCode,
        country,
        shift,
        labour,
        vehicle
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('signup success', response)
        toast.success('Employee Onboarded!')
      })
      .catch(error => {
        console.log('Signup ERROR', error.response.data)
        toast.error('Employee Onboarding failed')
      })
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.firstName)}
                    required
                    fullWidth
                    label='First Name'
                    placeholder='Leonard'
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.lastName)}
                    required
                    fullWidth
                    label='Last Name'
                    placeholder='Carter'
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='nickName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.nickName)}
                    required
                    fullWidth
                    label='Nick Name'
                    placeholder='carterLeonard'
                  />
                )}
              />
              {errors.nickName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.nickName.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label='Season Start Date'
                  value={basicPicker}
                  sx={{ width: '10px' }}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='phone1'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.phone1)}
                    required
                    fullWidth
                    label='Phone 1'
                    placeholder='123-456-7891'
                  />
                )}
              />
              {errors.phone1 && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone1.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='phone2'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.phone2)}
                    required
                    fullWidth
                    label='Phone 2'
                    placeholder='123-456-7891'
                  />
                )}
              />
              {errors.phone2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone2.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email1'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email1)}
                    required
                    fullWidth
                    type='email'
                    label='Email 1'
                    placeholder='carterleonard@gmail.com'
                  />
                )}
              />
              {errors.email1 && <FormHelperText sx={{ color: 'error.main' }}>{errors.email1.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email2'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email2)}
                    required
                    fullWidth
                    type='email'
                    label='Email 2'
                    placeholder='carterleonard@gmail.com'
                  />
                )}
              />
              {errors.email2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.email2.message}</FormHelperText>}
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='streetAddress'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.streetAddress)}
                    required
                    fullWidth
                    label='Street Address'
                    placeholder='Leonard'
                  />
                )}
              />
              {errors.streetAddress && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.streetAddress.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='postalCode'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.postalCode)}
                    required
                    fullWidth
                    label='Postal Code'
                    placeholder='A0A 0A0'
                  />
                )}
              />
              {errors.postalCode && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.postalCode.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.city)}
                    required
                    fullWidth
                    label='City'
                    placeholder='Toronto'
                  />
                )}
              />
              {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-personal-province-select-label'>Province</InputLabel>
                <Controller
                  name='province'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.province)}
                      required
                      id='stepper-alternative-personal-multiple-select'
                      labelId='stepper-alternative-personal-province-select-label'
                      input={<OutlinedInput label='Province' id='stepper-alternative-select-multiple-language' />}
                    >
                      <MenuItem value='Alberta'>Alberta</MenuItem>
                      <MenuItem value='British Columbia'>British Columbia</MenuItem>
                      <MenuItem value='Manitoba'>Manitoba</MenuItem>
                      <MenuItem value='New Brunswick'>New Brunswick</MenuItem>
                      <MenuItem value='Newfoundland and Labrador'>Newfoundland and Labrador</MenuItem>
                      <MenuItem value='Northwest Territories'>Northwest Territories</MenuItem>
                      <MenuItem value='Nunavut'>Nunavut</MenuItem>
                      <MenuItem value='Ontario'>Ontario</MenuItem>
                      <MenuItem value='Prince Edward Island'>Prince Edward Island</MenuItem>
                      <MenuItem value='Quebec'>Quebec</MenuItem>
                      <MenuItem value='Saskatchewan'>Saskatchewan</MenuItem>
                      <MenuItem value='Yukon'>Yukon</MenuItem>
                    </Select>
                  )}
                />
                {errors.province && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.province.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-personal-select-label'>Country</InputLabel>
                <Controller
                  name='country'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.country)}
                      label='Country'
                      id='stepper-alternative-personal-select'
                      labelId='stepper-alternative-personal-select-label'
                    >
                      <MenuItem value='Canada'>Canada</MenuItem>
                    </Select>
                  )}
                />
                {errors.country && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>Do you prefer day, night or both shifts? *</FormLabel>
                <Controller
                  name='shift'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.shift)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value='Day' control={<Radio />} label='I prefer day shift only' />
                      <FormControlLabel value='Night' control={<Radio />} label='I prefer night shift only' />
                      <FormControlLabel
                        value='Day, Night'
                        control={<Radio />}
                        label='I will work both day and night shifts'
                      />
                    </RadioGroup>
                  )}
                />
                {errors.shift && <FormHelperText sx={{ color: 'error.main' }}>{errors.shift.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Are you able and interested in doing labour shifts? The ability to move heavy objects is required. *
                </FormLabel>
                <Controller
                  name='labour'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.labour)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes, I don't mind doing physical labour"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No, I don't want to do physical labour"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.labour && <FormHelperText sx={{ color: 'error.main' }}>{errors.labour.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Do you have a car and are willing to drive long distances? *
                </FormLabel>
                <Controller
                  name='vehicle'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.vehicle)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={true} control={<Radio />} label='Yes, I have a car' />
                      <FormControlLabel value={false} control={<Radio />} label='No, I do not have a car' />
                    </RadioGroup>
                  )}
                />
                {errors.vehicle && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained'>
              Go to application
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              {/* {activeStep === steps.length - 1 ? (
                <Button size='large' variant='contained' type='Submit'>
                  Submit
                </Button>
              ) : (
                <Button size='large' variant='contained' onClick={handleNext}>
                  Next
                </Button>
              )} */}
              <Button size='large' variant='contained' type='Submit' disabled={activeStep === 1}>
                Submit
              </Button>

              <Button size='large' variant='contained' type={typeSubmit} onClick={handleNext}>
                {/* {activeStep === steps.length - 1 ? 'Submit' : 'Next'} */}Next
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  )
}

export default OnboaringForm