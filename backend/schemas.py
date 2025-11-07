from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


class Records(BaseModel):
    id: int
    name: str
    gender: str
    date_of_birth: str
    occupation: str
    state_of_origin: str

    class Config:
        from_attributes = True
# class TaskBase(BaseModel):
#     title: str
#     description: str

# class TaskCreate(TaskBase):
#     pass

# class TaskResponse(BaseModel):
#     id: int
#     user_id: int
#     title: str
#     description: str

#     class Config:
#         from_attributes = True