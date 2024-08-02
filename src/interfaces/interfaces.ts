export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    telephone?: Telephone;
    password?: string;
    address?: string;
    role?: Role;
    enabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Telephone {
    indicatif?: string;
    number?: string;
}

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    AMDIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    MANAGER = 'MANAGER',
}
export interface Location {
    address?: string;
    country?: string;
    city?: string;
}

export interface Hotel {
    id?: string;
    name?: string;
    location?: Location;
    rooms_count?: number;
    description?: string;
    cover?: string;
    images?: string[];
    gps_coordinate?: string;
    rooms?: string[];
    commentaires?: Commentaire[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Commentaire {
    id?: string;
    text?: string;
    createdAt?: Date;
    updatedAt?: Date;
    hotel?: Hotel[];
}

export interface Room {
    id?: string;
    num_room?: string;
    room_type?: RoomType;
    price_per_night?: string;
    capacity?: string;
    description?: string;
    is_available?: string;
    images?: string[];
    etage?: number;
    equipments?: string[];
    surface?: number;
    createdAt?: Date;
    updatedAt?: Date;
    hotel?: Hotel[];
}
export interface Reservation {
    id?: string;
    dateArrivee?: Date;
    dateDepart?: Date;
    dureeSejour?: number;
    //dureeSejour?: Time;
    personCount?: number;
    status?: BookingStatus;
    moyenPaiement?: PaymentMethod;
    options?: string;
    customerId?: string;
    customer?: User;
    hotelId?: string;
    hotel?: Hotel;
    roomId?: string;
    room?: Room;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum RoomType {
    SIMPLE = 'SIMPLE',
    DOUBLE = 'DOUBLE',
    SUITE = 'SUITE',
}

export enum PaymentMethod {
    Virement = 'Virement',
    CarteCredit = 'Carte Crédit',
}

export enum BookingStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Cancelled = 'Cancelled',
}