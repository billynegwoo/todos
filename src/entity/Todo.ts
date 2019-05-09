import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    value: string;

    @Column()
    favorite: boolean;
}
